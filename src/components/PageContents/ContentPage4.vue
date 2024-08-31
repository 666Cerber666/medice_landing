<template>
    <div class="flex flex-col gap-3">
      <div class="bg-gray-200 p-4 flex justify-between">
        Город: {{ cityStore.selectedCity }}
        <span @click="PrevousPage()" class="hover:text-white hover:cursor-pointer">Выбрать другой город</span>
      </div>
      <div class="bg-gray-200 p-4 flex justify-between">
        Организация: {{ organizationsStore.selectedOrganization.name }}
        <span @click="PrevousPage()" class="hover:text-white hover:cursor-pointer">Выбрать другую организацию</span>
      </div>
      <div class="bg-gray-200 p-4 flex justify-between">
        Специалист: {{ specialistsStore.selectedSpecialist.name }}
        <span @click="PrevousPageSpecialists()" class="hover:text-white hover:cursor-pointer">Выбрать другого специалиста</span>
      </div>
      <div class="bg-gray-200 p-4 flex justify-between">
        Врач и время: {{ specialistsStore.selectedSpecialist.name }} {{ doctorsStore.selectedDoctor.startTime }}
        <span @click="PrevousPageSpecialists()" class="hover:text-white hover:cursor-pointer">Выбрать другого врача</span>
      </div>
      <div>
        <form class="flex flex-col border-2 rounded-md gap-4 border-green-400 p-4">
          <h2>Укажите данные пациента</h2>
          <div class="flex gap-4">
          <div class="flex flex-col gap-4">
            <label for="fam">Фамилия*</label>
            <label for="nam">Имя*</label>
            <label for="fanam">Отчество</label>
            <label for="dat">Дата рождения*</label>
            <label for="mail">Почта для получения талона</label>
            <label for="phon">Телефон</label>
            </div>
              <div class="flex flex-col gap-4 w-full">
              <input name="fam" type="text" required>
              
              <input name="nam" type="text" required>
              
              <input name="fanam" type="text">
              
              <input name="dat" type="date" required>
              
              <input name="mail" type="mail">
              
              <input name="phon" type="phone">
              </div>
            </div>
          <div class="flex gap-4 items-center">
            <input class="w-6 h-6" type="checkbox">
          <label>
            Я даю согласие на обработку своих персональных данных (имя, отчество, фамилия, дата рождения, почта, телефон) в соответсвии с требованиями Федерального закона №152-ФЗ от 27.07.2006.  
          </label>
          <button class="bg-green-200 rounded-md p-4 hover:text-white">Далее</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { useCityStore } from '../../stores/cityStore'
  import { useOrganizationsStore } from '../../stores/organizationsStore'
  import { useSpecialistsStore } from '../../stores/specialistsStore'
  import { useWitchDoctorStore } from '../../stores/witchDoctorsStore'
  import Calendar from '../Calendar.vue'
  
  export default {
    components: {
      Calendar
    },
    data() {
      return {
        currentPage: 2,
        doctorSelect: null,
        currentDate: new Date(),
      }
    },
    setup() {
      const cityStore = useCityStore()
      const organizationsStore = useOrganizationsStore()
      const specialistsStore = useSpecialistsStore()
      const doctorsStore = useWitchDoctorStore()
      return { cityStore, organizationsStore, specialistsStore, doctorsStore }
    },
    mounted() {
      this.specialistsStore.setSpecialists(this.specialists)
    },
    methods: {
      PrevousPage() {
        this.currentPage = 0;
        this.$emit('update:currentPage', this.currentPage);
      },
      PrevousPageSpecialists() {
        this.currentPage = 1;
        this.$emit('update:currentPage', this.currentPage);
      },
      AddPage(doctor) {
        this.currentPage++;
        this.specialistsStore.setSelectedSpecialist(doctor)
        this.$emit('update:currentPage', this.currentPage);
      },
      showCalendar(doctor) {
        this.doctorSelect = doctor;
        this.calendarVisible = !this.calendarVisible;
      },
      closeCalendar() {
        this.doctorSelect = null;
      },
      generateSchedule(doctor) {
      const schedule = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(this.currentDate);
        date.setDate(this.currentDate.getDate() + i);
        const timeSlots = [];
        for (let j = 0; j < 12; j++) { // 3 hours with 15-minute intervals
          const startTime = new Date(date);
          startTime.setHours(9 + j); // Start at 9:00 AM
          startTime.setMinutes(j * 15);
          const endTime = new Date(startTime);
          endTime.setMinutes(startTime.getMinutes() + 15);

          // Удаляем 2 случайных слота для демонстрации занятых временных интервалов
          if (Math.random() < 0.1) {
            timeSlots.push({
              startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              available: false // Занят 
            });
          } else {
            timeSlots.push({
              startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              available: true // Свободен 
            });
          }
        }
        schedule.push({
          date,
          timeSlots
        });
      }
      doctor.schedule = schedule;
      return schedule;
    }
    }
  }
  </script>
  
  <style scoped>
    div > label{
      padding:3px;
    }
    div > input{
      border:1px solid gray;
      border-radius:5px;
      padding:2px;
    }
  </style>