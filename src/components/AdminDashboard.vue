<template>

  <div class="dashboard pt-4 md:pt-10 px-4">
    <h1 class=" md:text-4xl text-xl font-bold m-10">Admin Dashboard Statistics </h1>
    <CardCharts />
    <div class="charts-container">
      <div class="chart full-width">
        <h2>Total Costs, Profits, and Sales</h2>
        <apexchart type="bar" height="400" :options="totalProfitsOptions" :series="totalProfitsSeries" />
      </div>
      <div class="flex flex-col md:flex-row gap-5 w-full justify-between">
        <div class="chart w-full md:w-1/2">
          <h2>Subscriptions Revenue</h2>
          <apexchart type="area" height="350" :options="dailyVisitsOptions" :series="dailyVisitsSeries" />
        </div>
        <div class="chart w-full md:w-1/2">
          <h2>Categories</h2>
          <apexchart type="donut" height="350" :options="departmentSalesOptions" :series="departmentSalesSeries" />
        </div>
      </div>

      <div class="chart w-full md:w-1/2">
        <h2>Sales Revenue</h2>
        <apexchart type="line" height="350" :options="customersOptions" :series="customersSeries" />
      </div>
    </div>
  </div>
</template>



<script>
import VueApexCharts from 'vue3-apexcharts';
import CardCharts from './AdminCrdsCharts.vue';
import axios from 'axios';

export default {
  name: 'AdminChartsDashboard',
  components: {
    apexchart: VueApexCharts,
    CardCharts,
  },
  data() {
    return {
      monthlySalesOptions: {
        chart: { type: 'bar', toolbar: { show: false } },
        plotOptions: { bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' } },
        dataLabels: { enabled: false },
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
      },

      monthlySalesSeries: [{ name: 'Total Costs', data: [] }],

      departmentSalesOptions: {
        chart: { type: 'donut' },
        labels: ["Beverages", "Cleaning", "Dairy", "Frozen Goods", "Vegetables Fruits", "Cooking Oils", "Snacks", "Sauces"],
        responsive: [{ breakpoint: 480, options: { chart: { width: 200 } } }],
        colors: ['#f97887', '#b4eeb4', '#66cdaa', '#50c878', '#66cdaa', '#0b5345', '#ff7f50', '#6495ed'],
        legend: {
          show: false
        }
      },

      departmentSalesSeries: [],

      dailyVisitsOptions: {
        chart: { type: 'area', toolbar: { show: false } },
        dataLabels: { enabled: true },
        stroke: { curve: 'smooth' },
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
      },

      dailyVisitsSeries: [{ name: 'Subscriptions', data: [] }],

      customersOptions: {
        chart: { type: 'line', toolbar: { show: false } },
        stroke: { curve: 'smooth', width: 2 },
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
      },

      customersSeries: [{ name: 'Sales Revenue', data: [] }],

      totalProfitsOptions: {

        // states: {
        //   hover: {
        //     filter: {
        //       type: 'none' // Removes the shadow effect on hover
        //     }
        //   }
        // },

        chart: { type: 'bar', toolbar: { show: false } },

        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '60%',
            endingShape: 'rounded',
            borderRadius: 2, // Adjust the roundness
            borderRadiusApplication: 'around', // Adjusts the corners of the bar
            // borderRadiusWhenStacked: 'all', // Customizes rounding for stacked bars
            barHeight: 'full',
            // distributed: true,  // This will give each bar an equal space in the group
            barGap: 5, // Adds space between bars in each group
          },

        },

        dataLabels: {
          enabled: false,
          style: { colors: ['#000'] }
        },

        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },

        colors: ['#28a745', '#007bff', '#ff4d4d'],
        // colors: ['#28a745', '#ff4d4d', '#007bff'],

        responsive: [
          {
            breakpoint: 640,
            options: {
              dataLabels: {
                style: {
                  colors: ['transparent'],
                },
              },
            },
          },
        ],

        stroke: {
          show: true,
          curve: 'smooth', // Options: 'smooth', 'straight', 'stepline'
          lineCap: 'round', // Options: 'butt', 'square', 'round'
          colors: ['transparent'],
          width: 5,
        },

      },

      totalProfitsSeries: [
        { name: 'Total Profits', data: [] },
        { name: 'Total Costs', data: [] },
        { name: 'Total Sales', data: [] }
      ],
    }
  },


  created() {
    this.fetchCategoryData();
    this.fetchMonthlySalesData();
  },

  methods: {
    async fetchCategoryData() {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/category.json'),
          axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/products.json')
        ]);

        const categories = categoriesResponse.data || {};
        const products = productsResponse.data || {};

        if (Object.keys(categories).length && Object.keys(products).length) {
          const categoryProductCounts = {};
          Object.values(products).forEach(product => {
            if (product.catId) {
              categoryProductCounts[product.catId] = (categoryProductCounts[product.catId] || 0) + 1;
            }
          });

          const chartData = Object.entries(categories).map(([id, category]) => ({
            categoryId: id,
            name: category.name || 'Unknown Category',
            count: categoryProductCounts[id] || 0
          }));

          this.departmentSalesOptions.labels = chartData.map(item => item.name);
          this.departmentSalesSeries = chartData.map(item => item.count);
        } else {
          console.error('Categories or products not found in the API response');
        }
      } catch (error) {
        console.error('Error fetching category and product data:', error);
      }
    },

    async fetchMonthlySalesData() {
      try {
        const response = await axios.get('https://dailymart-5c550-default-rtdb.firebaseio.com/profits.json');
        const profits = response.data || {};

        const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

        const totalCostsData = monthNames.map(month => profits[month]?.totalCosts || 0);
        const salesRevenueData = monthNames.map(month => profits[month]?.salesRevenue || 0);
        const subscriptionRevenueData = monthNames.map(month => profits[month]?.subscriptionsRevenue || 0);

        this.monthlySalesSeries = [{ name: 'Total Costs', data: totalCostsData }];
        this.customersSeries = [{ name: 'Sales Revenue', data: salesRevenueData }];
        this.dailyVisitsSeries = [{ name: 'Subscriptions', data: subscriptionRevenueData }];
        const totalProfitsData = monthNames.map(month => {
          const sales = profits[month]?.salesRevenue || 0;
          const subscriptions = profits[month]?.subscriptionsRevenue || 0;
          const costs = profits[month]?.totalCosts || 0;
          return (sales + subscriptions) - costs;
        });

        this.totalProfitsSeries[0].data = totalProfitsData;
        this.totalProfitsSeries[1].data = totalCostsData;

        const totalSalesData = monthNames.map(month => {
          const sales = profits[month]?.salesRevenue || 0;
          const subscriptions = profits[month]?.subscriptionsRevenue || 0;
          return sales + subscriptions;
        });

        this.totalProfitsSeries[2].data = totalSalesData;

      } catch (error) {
        console.error('Error fetching monthly sales data:', error);
      }
    },
  }
};
</script>

<style scoped>
@media (max-width:640px) {
  .dashboard {
    padding: 0px;

  }
}

.charts-container {
  display: block;
}

.chart {
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.full-width {
  width: 100%;
}
</style>