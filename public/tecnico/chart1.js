var ctx = document.getElementById('lineChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai','Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'],
        datasets: [{
            label: 'Ganhos em $',
            data: [2022, 2023, 2024, 2025],
            backgroundColor: [
                'rgba(173, 150, 96, 1)'
            ],
            borderColor: [
                'rgba(173, 150, 96, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});