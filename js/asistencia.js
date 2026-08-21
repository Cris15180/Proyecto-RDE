// ======================================
// ESTUDIANTES DE CADA SECCIÓN
// ======================================

const sections = {

    seccion1: [
        "Carlos",
        "María",
        "Juan",
        "Ana",
        "Pedro"
    ],

    seccion2: [
        "Luis",
        "Sofía",
        "Daniel",
        "Laura",
        "Miguel"
    ],

    seccion3: [
        "Andrés",
        "Valeria",
        "Diego",
        "Camila",
        "José"
    ],

    seccion4: [
        "Fernando",
        "Gabriela",
        "Roberto",
        "Elena",
        "Pablo"
    ]

};


// ======================================
// ESTADO DE ASISTENCIA
// ======================================

const attendance = {};


// ======================================
// ELEMENTOS DEL HTML
// ======================================

const sectionSelect =
    document.getElementById("sectionSelect");

const sectionTitle =
    document.getElementById("sectionTitle");

const studentsList =
    document.getElementById("studentsList");

const chartCanvas =
    document.getElementById("attendanceChart");


// ======================================
// CREAR ESTADO INICIAL
// ======================================

Object.keys(sections).forEach(section => {

    attendance[section] = {};

    sections[section].forEach(student => {

        attendance[section][student] = false;

    });

});


// ======================================
// MOSTRAR ESTUDIANTES
// ======================================

function showStudents(section) {

    sectionTitle.textContent =
        section.replace("seccion", "Sección ");

    studentsList.innerHTML = "";

    sections[section].forEach(student => {

        const studentDiv =
            document.createElement("div");

        studentDiv.classList.add("student");


        const name =
            document.createElement("span");

        name.classList.add("student-name");

        name.textContent = student;


        const button =
            document.createElement("button");

        button.classList.add("attendance-button");


        if (attendance[section][student]) {

            button.textContent = "Presente";

            button.classList.add("present");

        } else {

            button.textContent = "Ausente";

            button.classList.add("absent");

        }


        button.addEventListener("click", () => {

            attendance[section][student] =
                !attendance[section][student];

            showStudents(section);

            updateChart();

        });


        studentDiv.appendChild(name);

        studentDiv.appendChild(button);

        studentsList.appendChild(studentDiv);

    });

}


// ======================================
// CALCULAR PORCENTAJE DE ASISTENCIA
// ======================================

function calculateAttendance(section) {

    const students =
        sections[section];

    const total =
        students.length;

    const present =
        students.filter(student =>
            attendance[section][student]
        ).length;


    if (total === 0) {
        return 0;
    }


    return Math.round(
        (present / total) * 100
    );

}


// ======================================
// CREAR GRÁFICA
// ======================================

const attendanceChart =
    new Chart(chartCanvas, {

        type: "bar",

        data: {

            labels: [
                "Sección 1",
                "Sección 2",
                "Sección 3",
                "Sección 4"
            ],

            datasets: [

                {
                    label: "Asistencia (%)",

                    data: [
                        0,
                        0,
                        0,
                        0
                    ],

                    backgroundColor: [
                        "rgba(59, 130, 246, 0.6)",
                        "rgba(34, 197, 94, 0.6)",
                        "rgba(249, 115, 22, 0.6)",
                        "rgba(168, 85, 247, 0.6)"
                    ],

                    borderColor: [
                        "rgb(59, 130, 246)",
                        "rgb(34, 197, 94)",
                        "rgb(249, 115, 22)",
                        "rgb(168, 85, 247)"
                    ],

                    borderWidth: 2
                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            scales: {

                y: {

                    beginAtZero: true,

                    max: 100,

                    title: {

                        display: true,

                        text: "Porcentaje de asistencia"

                    }

                }

            }

        }

    });


// ======================================
// ACTUALIZAR GRÁFICA
// ======================================

function updateChart() {

    attendanceChart.data.datasets[0].data = [

        calculateAttendance("seccion1"),

        calculateAttendance("seccion2"),

        calculateAttendance("seccion3"),

        calculateAttendance("seccion4")

    ];


    attendanceChart.update();

}


// ======================================
// CAMBIAR DE SECCIÓN
// ======================================

sectionSelect.addEventListener("change", () => {

    const selectedSection =
        sectionSelect.value;

    showStudents(selectedSection);

});


// ======================================
// INICIAR SISTEMA
// ======================================

showStudents("seccion1");

updateChart();