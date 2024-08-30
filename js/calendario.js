document.addEventListener('DOMContentLoaded', function() {
    const calendarContainer = document.getElementById('calendar-container');
    let periodDays = [];
    const currentMonthIndex = new Date().getMonth(); // Índice del mes actual
    const currentYear = new Date().getFullYear(); // Año actual

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const daysInMonth = [31, isLeapYear(currentYear) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    // Generar los meses dinámicamente
    for (let i = 0; i < 12; i++) {
        generateMonth(i);
    }

    function generateMonth(monthIndex) {
        const monthContainer = document.createElement('div');
        monthContainer.classList.add('calendar-container');
        monthContainer.innerHTML = `
            <h2>${monthNames[monthIndex]} ${currentYear}</h2>
            <div class="calendar">
                <div class="calendar-weekdays">
                    <div>Dom</div>
                    <div>Lun</div>
                    <div>Mar</div>
                    <div>Mié</div>
                    <div>Jue</div>
                    <div>Vie</div>
                    <div>Sáb</div>
                </div>
                <div class="calendar-days" id="month-${monthIndex}">
                    <!-- Aquí se generarán los días del mes -->
                </div>
            </div>
        `;
        calendarContainer.appendChild(monthContainer);
        generateDays(document.getElementById(`month-${monthIndex}`), daysInMonth[monthIndex]);
    }

    function generateDays(container, days) {
        for (let i = 1; i <= days; i++) {
            const day = document.createElement('div');
            day.innerHTML = `<span>${i}</span>`;
            day.addEventListener('click', function() {
                const dayNumber = parseInt(this.textContent);
                const monthIndex = parseInt(this.parentElement.id.split('-')[1]);
                if (!isNaN(dayNumber) && monthIndex <= currentMonthIndex) {
                    if (monthIndex === 7) { // Solo permitir marcar en agosto (mes 7)
                        if (this.classList.contains('period-day')) {
                            this.classList.remove('period-day');
                            this.innerHTML = `<span>${dayNumber}</span>`;
                            periodDays = periodDays.filter(date => date.day !== dayNumber || date.month !== monthIndex);
                            clearNextCycle();
                            markNextCycle();
                        } else {
                            if (canAddPeriodDay(dayNumber, monthIndex)) {
                                if (periodDays.filter(date => date.month === monthIndex).length < 9) {
                                    this.classList.add('period-day');
                                    this.innerHTML = `<span>${dayNumber}</span>❤️`;
                                    periodDays.push({ day: dayNumber, month: monthIndex });
                                    clearNextCycle();
                                    if (monthIndex === currentMonthIndex) {
                                        clearFuturePredictions();
                                    }
                                    markNextCycle();
                                } else {
                                    alert('Solo puedes marcar hasta 9 días en el mes, deberías consultar con un profesional.');
                                }
                            } else {
                                alert('Solo puedes marcar hasta 7 días seguidos, deberías consultar con un profesional.');
                            }
                        }
                    } else {
                        alert('Solo puedes marcar días en el mes de agosto.');
                    }
                }
            });
            container.appendChild(day);
        }
    }

    function canAddPeriodDay(day, month) {
        const daysInCurrentMonth = periodDays.filter(date => date.month === month).map(date => date.day);
        daysInCurrentMonth.push(day);
        daysInCurrentMonth.sort((a, b) => a - b);

        let maxConsecutiveDays = 1;
        let currentConsecutiveDays = 1;

        for (let i = 1; i < daysInCurrentMonth.length; i++) {
            if (daysInCurrentMonth[i] === daysInCurrentMonth[i - 1] + 1) {
                currentConsecutiveDays++;
                maxConsecutiveDays = Math.max(maxConsecutiveDays, currentConsecutiveDays);
            } else {
                currentConsecutiveDays = 1;
            }
        }

        return maxConsecutiveDays <= 7;
    }

    function clearNextCycle() {
        document.querySelectorAll('.next-cycle-day').forEach(day => {
            day.classList.remove('next-cycle-day');
        });
        document.querySelectorAll('.ovulation-day').forEach(day => {
            day.classList.remove('ovulation-day');
        });
    }

    function markNextCycle() {
        periodDays.forEach(date => {
            let nextCycleDate = new Date(currentYear, date.month, date.day);
            for (let i = 0; i < 12; i++) { // Marcar en todos los meses
                nextCycleDate.setDate(nextCycleDate.getDate() + 28);
                const nextCycleMonth = nextCycleDate.getMonth();
                const nextCycleDay = nextCycleDate.getDate();
                const nextCycleContainer = document.getElementById(`month-${nextCycleMonth}`);
                if (nextCycleContainer) {
                    const nextCycleDayElement = nextCycleContainer.querySelector(`div:nth-child(${nextCycleDay})`);
                    if (nextCycleDayElement) {
                        nextCycleDayElement.classList.add('next-cycle-day');
                        markOvulation(nextCycleDate); // Marcar la ovulación
                    }
                }
            }
        });
    }

    function markOvulation(nextCycleDate) {
        const ovulationDate = new Date(nextCycleDate);
        ovulationDate.setDate(ovulationDate.getDate() - 14); // 14 días antes del próximo ciclo
        const ovulationMonth = ovulationDate.getMonth();
        const ovulationDay = ovulationDate.getDate();
        const ovulationContainer = document.getElementById(`month-${ovulationMonth}`);
        if (ovulationContainer) {
            const ovulationDayElement = ovulationContainer.querySelector(`div:nth-child(${ovulationDay})`);
            if (ovulationDayElement) {
                ovulationDayElement.classList.add('ovulation-day');
            }
        }
    }

    function clearFuturePredictions() {
        document.querySelectorAll('.future-prediction').forEach(day => {
            day.classList.remove('future-prediction');
        });
    }
});
