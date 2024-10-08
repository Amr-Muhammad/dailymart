<template>
  
    <div class="card-charts mx-auto">
      
      <div v-for="(card, index) in cardData" :key="index" class="card">
        <div class="card-content">
          <h2 class="card-value">{{ card.value }}</h2>
          <p class="card-title">{{ card.title }}</p>
        </div>
        <apexchart
          type="line"
          height="60"
          :options="card.chartOptions"
          :series="card.series"
        />
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  import VueApexCharts from 'vue3-apexcharts';
  
  export default defineComponent({
    name: 'CardCharts',
    components: {
      apexchart: VueApexCharts,
    },
    setup() {
      const cardData = ref([
        {
          title: 'Products',
          value: '0',
          series: [{ data: [] }],
          chartOptions: {
            chart: {
              type: 'line',
              sparkline: { enabled: true },
            },
            stroke: { curve: 'smooth', width: 2 },
            colors: ['#008FFB'],
            tooltip: {
              fixed: { enabled: false },
              x: { show: false },
              y: {
                title: {
                  formatter: function () {
                    return 'Products:';
                  },
                },
              },
              marker: { show: false },
            },
          },
        },
        {
          title: 'Users',
          value: '0',
          series: [{ data: [] }],
          chartOptions: {
            chart: {
              type: 'line',
              sparkline: { enabled: true },
            },
            stroke: { curve: 'smooth', width: 2 },
            colors: ['#00E396'],
            tooltip: {
              fixed: { enabled: false },
              x: { show: false },
              y: {
                title: {
                  formatter: function () {
                    return 'Users:';
                  },
                },
              },
              marker: { show: false },
            },
          },
        },
        {
          title: 'Boycotted Products',
          value: '0',
          series: [{ data: [] }],
          chartOptions: {
            chart: {
              type: 'line',
              sparkline: { enabled: true },
            },
            stroke: { curve: 'smooth', width: 2 },
            colors: ['#FEB019'],
            tooltip: {
              fixed: { enabled: false },
              x: { show: false },
              y: {
                title: {
                  formatter: function () {
                    return 'Boycotted Products:';
                  },
                },
              },
              marker: { show: false },
            },
          },
        },
      ]);
  
      const fetchData = async () => {
        try {
          const response = await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/.json');
          const data = response.data;
          const products = data.products ? Object.keys(data.products).length : 0;
          const users = data.users.customer ? Object.keys(data.users.customer).length : 0;
          const boycottedProducts = data.products
            ? Object.values(data.products).filter(product => product.boycott).length
            : 0;
          cardData.value[0].value = products;
          cardData.value[1].value = users;
          cardData.value[2].value = boycottedProducts;
          cardData.value[0].series[0].data = Array(products).fill(0).map((_, i) => i + 1); 
          cardData.value[1].series[0].data = Array(users).fill(0).map((_, i) => i + 1); 
          cardData.value[2].series[0].data = Array(boycottedProducts).fill(0).map((_, i) => i + 1); 
          } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      onMounted(fetchData);
  
      return {
        cardData,
      };
    },
  });
  </script>
  
  <style scoped>
  .card-charts {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 20px;
  }
  @media (max-width:640px) {
    .card-charts {
    display:block;
    
  }
  }
  .card {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 20px;
  }
  
  .card-content {
    margin-bottom: 10px;
  }
  
  .card-value {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
    color: #333;
  }
  
  .card-title {
    font-size: 14px;
    color: #666;
    margin: 5px 0 0;
  }
  </style>
  