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
      <div v-for="(doctor, index) in doctorsStore.doctors" :key="index" class="p-4 flex flex-col justify-between border-b">
        <div class="flex justify-between">
          {{ doctor.name }}
          <div>
            <button @click="showCalendar(doctor)" class="border-2 text-blue-300 border-blue-300 rounded-md p-4">Расписание</button>
            <button @click="AddPage(doctor)" class="bg-green-200 rounded-md p-4 hover:text-white">Выбрать</button>
          </div>
        </div>
        <transition name="fade">
          <div v-if="doctorSelect === doctor" class="flex flex-col mt-8">
            <div class="flex gap-8">
              <calendar :selectedDoctor="doctor" :currentDate="currentDate" @closeCalendar="closeCalendar"></calendar>
              <div class="overflow-y-auto h-96 w-full">
                <div class="flex flex-col gap-2" v-for="(date, index) in doctor.schedule" :key="index">
                    <div v-for="(timeSlot, index) in date.timeSlots" :key="index">
                    <div class="flex items-center justify-between" v-if="timeSlot.available">{{ timeSlot.startTime }}<button @click="AddPageWithTimeSlot(doctor, timeSlot)" class="bg-green-200 rounded-md p-2 hover:text-white">Записаться</button></div>
                    </div>
                </div>
                </div>
            </div>
          </div>
        </transition>
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
      AddPageWithTimeSlot(doctor, timeSlot) {
      this.currentPage++;
      this.specialistsStore.setSelectedSpecialist(doctor)
      this.doctorsStore.setSelectedDoctor(timeSlot)
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
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>