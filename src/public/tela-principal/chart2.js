var ctx = document.getElementById('doughnut').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Baixo', ' Alto', 'Moderado'],
        datasets: [{
            label: 'Employees',
            data: [42, 12, 8, 6],
            backgroundColor: [
                'rgba(41, 155, 99, 1)',
                'rgba(213, 0, 10, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderColor: [
                'rgba(41, 155, 99, 1)',
                'rgba(213, 0, 10, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});