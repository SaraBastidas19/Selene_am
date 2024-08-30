document.addEventListener('DOMContentLoaded', function () {
    const calendarContainer = document.getElementById('calendar-container');
    let periodDays = JSON.parse(localStorage.getItem('periodDays')) || [];
    let predictions = JSON.parse(localStorage.getItem('predictions')) || [];
    let ovulationDays = JSON.parse(localStorage.getItem('ovulationDays')) || [];
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
        generateDays(document.getElementById(`month-${monthIndex}`), daysInMonth[monthIndex], monthIndex);
    }

    function generateDays(container, days, monthIndex) {
        for (let i = 1; i <= days; i++) {
            const day = document.createElement('div');
            day.innerHTML = `<span>${i}</span>`;
            if (isPeriodDay(i, monthIndex)) {
                day.classList.add('period-day');
                day.innerHTML = `<span>${i}</span>❤️`;
            }
            if (isPredictionDay(i, monthIndex)) {
                day.classList.add('next-cycle-day');
            }
            if (isOvulationDay(i, monthIndex)) {
                day.classList.add('ovulation-day');
            }
            day.addEventListener('click', function () {
                const dayNumber = parseInt(this.textContent);
                if (!isNaN(dayNumber) && monthIndex <= currentMonthIndex) {
                    if (monthIndex === 7) { // Solo permitir marcar en agosto (mes 7)
                        if (this.classList.contains('period-day')) {
                            this.classList.remove('period-day');
                            this.innerHTML = `<span>${dayNumber}</span>`;
                            periodDays = periodDays.filter(date => date.day !== dayNumber || date.month !== monthIndex);
                            clearNextCycle();
                            markNextCycle();
                            removeMessage(dayNumber, monthIndex); // Eliminar mensaje
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
                savePeriodDays(); // Guardar días marcados
                checkAndClearMessages(); // Verificar y limpiar mensajes
            });
            container.appendChild(day);
        }
    }

    function isPeriodDay(day, month) {
        return periodDays.some(date => date.day === day && date.month === month);
    }

    function isPredictionDay(day, month) {
        return predictions.some(date => date.day === day && date.month === month);
    }

    function isOvulationDay(day, month) {
        return ovulationDays.some(date => date.day === day && date.month === month);
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
        clearMessages(); // Limpiar mensajes
        predictions = []; // Limpiar predicciones
        ovulationDays = []; // Limpiar días de ovulación
        savePredictions(); // Guardar predicciones
        saveOvulationDays(); // Guardar días de ovulación
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
                        sendMessage(nextCycleDate); // Enviar mensaje
                        predictions.push({ day: nextCycleDay, month: nextCycleMonth }); // Guardar predicción
                    }
                }
            }
        });
        savePredictions(); // Guardar predicciones
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
                ovulationDays.push({ day: ovulationDay, month: ovulationMonth }); // Guardar día de ovulación
            }
        }
        saveOvulationDays(); // Guardar días de ovulación
    }

    function sendMessage(nextCycleDate) {
        const messageDate = new Date(nextCycleDate);
        messageDate.setDate(messageDate.getDate() - 3); // 3 días antes del próximo ciclo
        const messageMonth = messageDate.getMonth();
        const messageDay = messageDate.getDate();
        const message = `Recuerda prepararte para la llegada de tu ciclo el ${messageDay} de ${monthNames[messageMonth]}.`;

        // Guardar el mensaje en localStorage
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push({ date: new Date(), text: message });
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    function removeMessage(day, month) {
        const nextCycleDate = new Date(currentYear, month, day + 28);
        const messageDate = new Date(nextCycleDate);
        messageDate.setDate(messageDate.getDate() - 3); // 3 días antes del próximo ciclo
        const messageMonth = messageDate.getMonth();
        const messageDay = messageDate.getDate();
        const messageText = `Recuerda prepararte para la llegada de tu ciclo el ${messageDay} de ${monthNames[messageMonth]}.`;

        // Eliminar el mensaje de localStorage
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages = messages.filter(message => message.text !== messageText);
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    function clearMessages() {
        localStorage.removeItem('messages');
    }

    function checkAndClearMessages() {
        if (periodDays.length === 0) {
            clearMessages();
        }
    }

    function savePeriodDays() {
        localStorage.setItem('periodDays', JSON.stringify(periodDays));
    }

    function savePredictions() {
        localStorage.setItem('predictions', JSON.stringify(predictions));
    }

    function saveOvulationDays() {
        localStorage.setItem('ovulationDays', JSON.stringify(ovulationDays));
    }

    function clearFuturePredictions() {
        document.querySelectorAll('.future-prediction').forEach(day => {
            day.classList.remove('future-prediction');
        });
    }
});
