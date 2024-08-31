// witchDoctorsStore.js
import { defineStore } from 'pinia'

export const useWitchDoctorStore = defineStore('doctors', {
  state: () => ({
    doctors: [
      { 
        id: 1, 
        name: 'Врач 1', 
        schedule: [
          {
            date: new Date('2023-03-01'),
            timeSlots: [
              { startTime: '09:00', available: true },
              { startTime: '10:00', available: false },
              { startTime: '11:00', available: true },
              { startTime: '12:00', available: true },
              { startTime: '13:00', available: true },
              { startTime: '14:00', available: true },
              { startTime: '15:00', available: true },
              { startTime: '16:00', available: true },
              { startTime: '17:00', available: true },
            ],
          },
          {
            date: new Date('2023-03-02'),
            timeSlots: [
              { startTime: '09:00', available: false },
              { startTime: '10:00', available: true },
              { startTime: '11:00', available: false },
            ],
          },
        ],
      },
      { id: 2, name: 'Врач 2', schedule: [
        {
          date: new Date('2023-03-01'),
          timeSlots: [
            { startTime: '09:00', available: true },
            { startTime: '10:00', available: true },
            { startTime: '11:00', available: false },
          ],
        },
      ]},
      { id: 3, name: 'Врач 3', schedule: [] },
      { id: 4, name: 'Врач 4', schedule: [] },
      { id: 5, name: 'Врач 5', schedule: [] },
    ],
    selectedDoctor: null,
  }),
  actions: {
    setDoctors(doctors) {
      this.doctors = doctors
    },
    setSelectedDoctor(doctor) {
      this.selectedDoctor = doctor
    },
  },
})