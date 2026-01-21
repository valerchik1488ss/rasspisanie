
const data = {
    subjects: {
        
    }
};


const subjectSelect = document.getElementById('subject');
const nameSelect = document.getElementById('name');
const scheduleBlock = document.getElementById('schedule');
const selectedNameSpan = document.getElementById('selected-name');
const scheduleContent = document.getElementById('schedule-content');


fillSubjects();



function fillSubjects() {
    subjectSelect.innerHTML = '<option value="">-- Выберите предмет --</option>';

    Object.keys(data.subjects).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = data.subjects[key].name || key;
        subjectSelect.appendChild(option);
    

		nameSelect.innerHTML = '<option value="">-- Выберите имя --</option>';
		scheduleBlock.style.display = 'none';
	});



}

function updateNames() {
    const subjectKey = subjectSelect.value;

    nameSelect.innerHTML = '<option value="">-- Выберите имя --</option>';
    scheduleBlock.style.display = 'none';

    if (!subjectKey) return;

    const subject = data.subjects[subjectKey];
    if (!subject.students) return;

    subject.students.forEach(student => {
        const option = document.createElement('option');
        option.value = student;
        option.textContent = student;
        nameSelect.appendChild(option);
    });
}

function showSchedule() {
    const subjectKey = subjectSelect.value;
    const name = nameSelect.value;

    scheduleContent.innerHTML = '';
    scheduleBlock.style.display = 'none';

    if (!subjectKey || !name) return;

    const subject = data.subjects[subjectKey];
    selectedNameSpan.textContent = name;

    const wrapper = document.createElement('div');
    wrapper.className = 'subject-block';

    wrapper.innerHTML = `<h3>${subject.name || subjectKey}</h3>`;


    if (subject.schedule && subject.schedule.length > 0) {
        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Время</th>
                    <th>Понедельник</th>
                    <th>Вторник</th>
                    <th>Среда</th>
                    <th>Четверг</th>
                    <th>Пятница</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = table.querySelector('tbody');

        subject.schedule.forEach(slot => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${slot.time}</td>`;

            ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].forEach(day => {
                tr.innerHTML += `<td>${slot.days?.[day] || ''}</td>`;
            });

            tbody.appendChild(tr);
        });

        wrapper.appendChild(table);
    }


    else if (subject.dates && subject.dates.length > 0) {
        const ul = document.createElement('ul');

        subject.dates.forEach(date => {
            const li = document.createElement('li');
            li.textContent = date;
            ul.appendChild(li);
        });

        wrapper.appendChild(ul);
    }

    
    else {
        wrapper.innerHTML += '<p>Нет данных по расписанию.</p>';
    }

    scheduleContent.appendChild(wrapper);
    scheduleBlock.style.display = 'block';
}


subjectSelect.addEventListener('change', updateNames);
nameSelect.addEventListener('change', showSchedule);
