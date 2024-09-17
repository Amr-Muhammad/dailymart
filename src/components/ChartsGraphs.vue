<template>
  <div class="container mx-auto">
    <section class="flexmobile flex-col ml-5 px-20 mt-44 flex justify-center">
      <p ref="autoTypingParagraph" class="md:text-2xl flexmobile font-bold green-color autoTyping">
        {{ displayText }}
      </p>
      <div class="charts-container mt-32 flexmobile gap-2 flex flex-col md:flex-row flex-wrap justify-center">
        <div class="chart-container flexmobile mb-10 md:mb-0 md:mr-10">
          <Pie id="my-pie-chart-id" :options="chartOptions" :data="pieChartData" />
        </div>
        <div class="chart-container flexmobile mb-10 md:mb-0 md:mr-10">
          <Bar id="my-bar-chart-id" :options="chartOptions" :data="barChartData" />
        </div>
        <div class="apexchart-container mt-20">
          <apexchart type="bar" height="350" :options="apexChartOptions" :series="apexSeries"></apexchart>
        </div>
      </div>
    </section>
    <section class="flexmobile flex-col ml-5 px-20 mt-44 flex justify-center">
      <p class="md:text-xl font-bold green-color">The percentage of revenues of boycotting companies in most Arab
        countries :</p>
      <p class="pt-4 pb-20 text-red-800 text-lg font-bold ">The lower it is, the greater the percentage of boycotting .
      </p>
      <div class="stats flexmobile shadow">
        <div class="stat place-items-center">
          <div class="stat-title">Egypt</div>
          <div class="stat-value">10% - 15% ↘︎</div>
          <div class="stat-desc pt-4"> Very Heigh BDS and very low revenues </div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title">kuwait </div>
          <div class="stat-value text-secondary">20% - 25% ↘︎</div>
          <div class="stat-desc text-secondary"> Middle revenues </div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title">United Arab Emirates</div>
          <div class="stat-value">60% - 65% ↗︎</div>
          <div class="stat-desc"> Very Heigh revenues and very low BDS </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Pie, Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import VueApexCharts from "vue3-apexcharts";

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

export default {
  name: 'ChartsComponent',
  components: { Pie, Bar, apexchart: VueApexCharts },
  data() {
    return {
      fullText: "Here's some data for international companies aiding and abetting Israel's violations of international law, including by operating in illegal Israeli settlements and acting as contractors for the Israeli military and government.",
      displayText: "",
      typingSpeed: 50,
      observer: null,
      pieChartData: {
        labels: ['P&G', 'Starbucks', "McDonald's", 'Coca-Cola'],
        datasets: [
          {
            label: 'company sales drop in (%)',
            data: [23.3, 16, 12, 35.6],
            backgroundColor: ['#00A1DF', '#00704A', '#FFCE56', '#fe001a'],
            hoverBackgroundColor: ['#00A1DF', '#00704A', '#FFCE56', '#fe001a']
          }
        ]
      },
      barChartData: {
        labels: ['PepsiCo', 'Yum! Brands', "Americana", 'Carrefour'],
        datasets: [
          {
            label: 'Companies sales drop (%)',
            data: [57.7, 10, 12, 15],
            backgroundColor: ['#28458E', '#EC1C24', '#28b9da', '#254F9B'],
            hoverBackgroundColor: ['#28458E', '#EC1C24', '#28b9da', '#254F9B']
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      apexSeries: [{
        name: 'Sales Drop in billions',
        data: [10, 45, 23, 16.6]
      }],
      apexChartOptions: {
        annotations: {
          points: [{
            x: 'Bananas',
            seriesIndex: 0,
            label: {
              borderColor: '#775DD0',
              offsetY: 0,
              style: {
                color: '#fff',
                background: '#775DD0',
              },
              text: 'sales',
            }
          }]
        },
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: '50%',
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 0
        },
        grid: {
          row: {
            colors: ['#fff', '#f2f2f2']
          }
        },
        xaxis: {
          labels: {
            rotate: -45
          },
          categories: ['Zara', 'Nestlé', 'Chipsy', "Domino's pizza"],
          tickPlacement: 'on'
        },
        yaxis: {
          title: {
            text: 'Sales Drop in billions',
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [50, 0, 100]
          },
        }
      }
    };
  },
  mounted() {
    this.setupIntersectionObserver();
  },
  methods: {
    setupIntersectionObserver() {
      this.observer = new IntersectionObserver(entries => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          this.typeText();
          this.observer.disconnect();
        }
      });

      if (this.$refs.autoTypingParagraph) {
        this.observer.observe(this.$refs.autoTypingParagraph);
      }
    },
    typeText() {
      let index = 0;
      const interval = setInterval(() => {
        if (index < this.fullText.length) {
          this.displayText += this.fullText.charAt(index);
          index++;
        } else {
          clearInterval(interval);
        }
      }, this.typingSpeed);
    }
  }
};
</script>
<style scoped>
.charts-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.chart-container {
  width: 500px;
  height: 300px;
  margin-bottom: 20px;
}

.apexchart-container {
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
}
</style>
