<template>
    <div class="bg-gray-100 p-4 rounded-md shadow-md">
      <div class="flex justify-between items-center mb-4">
        <button @click="prevMonth" class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 class="text-xl font-bold">{{ formattedMonthYear }}</h2>
        <button @click="nextMonth" class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <table class="w-full text-center">
        <thead>
          <tr>
            <th v-for="(day, index) in daysOfWeek" :key="index" class="py-2 px-4 font-medium text-gray-600 uppercase">
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, index) in weeks" :key="index">
            <td v-for="(day, dayIndex) in week" :key="dayIndex" :class="{ 'bg-gray-200': day.isCurrentMonth, 'text-gray-500': !day.isCurrentMonth }" @click="handleDayClick(day)" class="py-2 px-4 border cursor-pointer">
              <span v-if="day.isCurrentMonth">{{ day.date }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="closeCalendar" class="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded">
        Закрыть
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      selectedDoctor: Object,
      currentDate: Date,
    },
    data() {
      return {
        showCalendar: false,
        daysOfWeek: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        currentMonth: new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()),
        weeks: [],
      };
    },
    computed: {
      formattedMonthYear() {
        const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        return `${monthNames[this.currentMonth.getMonth()]} ${this.currentMonth.getFullYear()}`;
      },
    },
    mounted() {
      this.generateCalendar();
    },
    methods: {
      generateCalendar() {
        this.weeks = [];
        const firstDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
        const firstDayIndex = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Sunday is 0, we want to start from Monday
        let date = 1;
        let week = [];
        for (let i = 0; i < 6; i++) { // Max 6 weeks in a month
          for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDayIndex) {
              week.push({ date: null, isCurrentMonth: false });
            } else {
              const isCurrentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), date).getMonth() === this.currentMonth.getMonth();
              week.push({ date, isCurrentMonth });
              date++;
            }
          }
          this.weeks.push(week);
          week = [];
        }
      },
      prevMonth() {
        this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1);
        this.generateCalendar();
      },
      nextMonth() {
        this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1);
        this.generateCalendar();
      },
      handleDayClick(day) {
        if (day.isCurrentMonth) {
          this.$emit('dateSelected', new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), day.date));
        }
      },
      closeCalendar() {
        this.$emit('closeCalendar');
      },
    },
  };
  </script>
  