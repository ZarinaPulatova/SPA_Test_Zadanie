<template>
  <div>
    <h1>Продажи</h1>

    <div>
      <label for="dateFrom">Дата от:</label>
      <input type="date" v-model="dateFrom" />

      <label for="dateTo">Дата до:</label>
      <input type="date" v-model="dateTo" />

      <button @click="fetchSales">Применить фильтры</button>
    </div>

    <LineChart :chart-data="chartData" />

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Дата</th>
          <th>Сумма</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sale in sales" :key="sale.id">
          <td>{{ sale.id }}</td>
          <td>{{ sale.date }}</td>
          <td>{{ sale.amount }}</td>
        </tr>
      </tbody>
    </table>

    <pagination :current-page="currentPage" :total-pages="totalPages" @page-changed="onPageChanged" />
  </div>
</template>

<script>


  import { createApp, defineComponent, ref } from 'vue';
  import { Line } from 'vue-chartjs';
  import { Chart, registerables } from 'chart.js';

export default {
  components: {
    LineChart,
    Pagination,
  },
  setup() {
    const dateFrom = ref('');
    const dateTo = ref('');
    const sales = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(0);
    const chartData = ref({ labels: [], datasets: [] });

    const fetchSales = async () => {
      const token = 'YOUR_API_TOKEN'; // Замените на Ваш токен
      try {
        const response = await axios.get('/api/sales', {
          params: {
            dateFrom: dateFrom.value,
            dateTo: dateTo.value,
            page: currentPage.value,
            limit: 500,
            key: token,
          },
        });

        sales.value = response.data.data;
        totalPages.value = response.data.meta.total_pages;

        updateChartData();
      } catch (error) {
        console.error('Ошибка при загрузке данных продаж:', error);
      }
    };

    const updateChartData = () => {
      chartData.value.labels = sales.value.map(sale => sale.date);
      chartData.value.datasets = [
        {
          label: 'Сумма продаж',
          data: sales.value.map(sale => sale.amount),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ];
    };

    const onPageChanged = (page) => {
      currentPage.value = page;
      fetchSales();
    };

    onMounted(fetchSales);

    return {
      dateFrom,
      dateTo,
      sales,
      currentPage,
      totalPages,
      chartData,
      fetchSales,
      onPageChanged,
    };
  },
};
</script>

