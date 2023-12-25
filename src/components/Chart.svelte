<script>
    import { Duration } from "luxon";
    import { Chart, CategoryScale, LinearScale, PointElement, Tooltip, BarElement, BarController} from "chart.js";
    import { onMount } from 'svelte';
    export let byMonth;
    export let width;
    export let height;
    export let chartColor = "#4172bf";
    export let textColor = "#fff";
    let chartCanvas;
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    onMount(()=> {
        Chart.register(CategoryScale, LinearScale, BarElement, BarController, PointElement, Tooltip);
        let ctx = chartCanvas.getContext('2d');
		new Chart(ctx, {
				type: 'bar',
				data: {
                    labels: months,
                    datasets: [{
                        label: 'Chapters',
                        backgroundColor: chartColor,
                        borderColor: chartColor,
                        data: byMonth.map(x => x.chapters),
                    }]
				},
                options: {
                    responsive: true,
                    plugins: {
                        tooltip: {
                            enabled: true,
                            callbacks: {
                                label: function(context) {
                                    const data = byMonth[context.dataIndex];
                                    return "Chapters: "+data.chapters+" Time: "+Duration.fromMillis(data.time, {}).toFormat("h")+"h";
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            ticks: { color: textColor }
                        },
                        x: {
                            ticks: { color: textColor }
                        }
                    },
                    animations: {
                        tension: {
                            duration: 5000,
                            easing: 'easeInOutQuart',
                        }
                    }
                }
		});
      })
</script>

<canvas bind:this={chartCanvas} width={width} height={height}></canvas>
