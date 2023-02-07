<script setup>
import { RouterLink } from "vue-router";
import { ref, computed } from "vue";

const player = ref("X");
const board = ref([
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]);

const CalculateWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return isDraw.value ? "Seri" : null;
};

const isDraw = computed(() => {
  const flattenBoard = board.value.flat();
  return winner.value === null && !flattenBoard.includes("");
});

const winner = computed(() => CalculateWinner(board.value.flat()));

const MakeMove = (x, y) => {
  if (winner.value) return;

  if (board.value[x][y]) return;

  board.value[x][y] = player.value;

  player.value = player.value === "X" ? "O" : "X";
};

const ResetGame = () => {
  board.value = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  player.value = "X";
};
</script>

<template>
  <div class="mb-4">
    <RouterLink
      class="px-4 py-2 bg-pink-500/20 rounded uppercase font-bold hover:bg-pink-600 duration-300"
      to="/game4x4"
      >Ganti Jadi 4x4
    </RouterLink>
  </div>
  <section>
    <!-- The Game -->
    <div class="flex flex-col items-center mb-8 divide-y-4">
      <div v-for="(row, x) in board" :key="x" class="divide-x-4 grid grid-cols-3">
        <div
          v-for="(cell, y) in row"
          :key="y"
          @click="MakeMove(x, y)"
          :class="`shadow-xl w-24 h-24 hover:bg-indigo-500/20 flex items-center justify-center text-5xl cursor-pointer ${
            cell === 'X' ? 'text-red-400' : cell === 'O' ? 'text-indigo-400' : ''
          }`"
        >
          {{ cell === "X" ? "X" : cell === "O" ? "O" : "" }}
        </div>
      </div>
    </div>
    <!-- End Game -->
  </section>

  <div class="text-center">
    <p class="text-3xl mb-4" v-if="!winner">
      Pemain
      <span :class="`text-6xl ${player === 'X' ? 'text-red-400' : 'text-indigo-400'}`">{{
        player
      }}</span>
      jalan
    </p>

    <p
      v-if="winner && winner !== 'Seri'"
      class="text-6xl mb-4"
      :class="{ 'text-red-400': winner === 'X', 'text-indigo-400': winner === 'O' }"
    >
      {{ winner }} <span class="text-gray-200 text-3xl">Menang!</span>
    </p>
    <p class="text-gray-200 text-6xl font-semibold" v-if="winner === 'Seri'">
      {{ winner }}!
    </p>

    <button
      v-if="winner"
      @click="ResetGame"
      class="px-4 py-2 bg-pink-500/20 rounded uppercase font-bold hover:bg-pink-600 duration-300"
    >
      Mulai lagi
    </button>
  </div>
</template>
