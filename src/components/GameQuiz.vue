<script setup>
import { RouterLink } from "vue-router";
import { ref, computed } from "vue";

const questions = ref([
  {
    question: "Apa itu Vue?",
    answer: 0,
    options: ["Framework", "Perpustakaan", "Es Krim, Yum Yum"],
    selected: null,
  },
  {
    question: "Apa itu Vuex?",
    answer: 1,
    options: ["Framework", "State Management Library", "Es Krim, Yum Yum"],
    selected: null,
  },
  {
    question: "Apa fungsi Vue-Router?",
    answer: 2,
    options: ["Framework", "Perpustakaan", "Routing library buat Vue JS"],
    selected: null,
  },
]);

const quizCompleted = ref(false);
const currentQuestion = ref(0);
const score = computed(() => {
  let value = 0;
  questions.value.map((q) => {
    if (q.selected == q.answer) {
      value++;
    }
  });
  return value;
});

const getCurrentQuestion = computed(() => {
  let question = questions.value[currentQuestion.value];
  questions.index = currentQuestion.value;
  return question;
});

const SetAnswer = (evt) => {
  questions.value[currentQuestion.value].selected = evt.target.value;
  evt.target.value = null;
};

const NextQuestion = () => {
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++;
  } else {
    quizCompleted.value = true;
  }
};
</script>

<template>
  <div class="m-0 p-0 box-border font-[Montserrat] bg-[#271c36] text-white min-h-screen">
    <div class="flex flex-col items-center justify-center p-2">
      <div class="">
        <Router-Link to="/">Kembali</Router-Link>
        <!-- da quiz -->
        <h1 class="text-[2rem] mb-[2rem] text-center">The quiz</h1>
        <section
          class="bg-[#382a4b] p-[1rem] w-[100%] max-w-[640px]"
          v-if="!quizCompleted"
        >
          <div class="flex justify-between mb-[1rem] rounded-sm">
            <span class="text-[#8f8f8f] text-[1.25rem]">{{
              getCurrentQuestion.question
            }}</span>
            <span class="text-white text-[1.25rem]"
              >Score {{ score }}/ {{ questions.length }}</span
            >
          </div>
          <div class="">
            <label
              class="block p-1 bg-[#271c36] mb-[0.5rem] rounded-[0.5rem]"
              v-for="(option, index) in getCurrentQuestion.options"
              :key="index"
              :class="`option hover:bg-[#2d213f] ${
                getCurrentQuestion.selected == index
                  ? index == getCurrentQuestion.answer
                    ? 'bg-[#2cce7d] hover:bg-[#2cce7d]'
                    : 'bg-[#e40e0e] hover:bg-[#e40e0e]'
                  : ''
              } ${
                getCurrentQuestion.selected != null &&
                index != getCurrentQuestion.selected
                  ? 'opacity-[0.5]'
                  : ''
              }`"
            >
              <input
                class="mb-[1rem]"
                type="radio"
                :name="getCurrentQuestion.index"
                :value="index"
                v-model="getCurrentQuestion.selected"
                :disabled="getCurrentQuestion.selected"
                @change="SetAnswer"
              /><span>{{ option }}</span></label
            >
          </div>

          <button class="" @click="NextQuestion" :disabled="!getCurrentQuestion.selected">
            {{
              getCurrentQuestion.index == questions.length - 1
                ? "Finish"
                : getCurrentQuestion.selected == null
                ? "Select an option"
                : "Next question"
            }}
          </button>
        </section>
        <section v-else>
          <h2>you have finished da quiz</h2>
          <p>Your score is {{ score }} / {{ questions.length }}</p>
        </section>
        <!-- end quiz -->
      </div>
    </div>
    <section>
      <div></div>
    </section>
  </div>
</template>
