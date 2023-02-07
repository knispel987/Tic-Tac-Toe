<script setup>
import { RouterLink } from "vue-router";
import { ref, computed } from "vue";

const player = ref("X");
const board = ref([
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
]);

const CalculateWinner = (board) => {
  const lines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c] &&
      board[a] === board[d]
    ) {
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
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ];
  player.value = "X";
};
</script>

<template>
  <div class="mb-2">
    <RouterLink
      class="px-4 py-2 bg-pink-500/20 rounded uppercase font-bold hover:bg-pink-600 duration-300"
      to="/"
      >Ganti Jadi 3x3
    </RouterLink>
  </div>
  <section>
    <!--  Da Game -->
    <div class="flex flex-col items-center mb-8 divide-y-4">
      <div v-for="(row, x) in board" :key="x" class="grid grid-cols-4 divide-x-4">
        <div
          v-for="(cell, y) in row"
          :key="y"
          @click="MakeMove(x, y)"
          :class="` shadow-xl w-20 h-20 hover:bg-indigo-500/20 flex items-center justify-center text-4xl cursor-pointer ${
            cell === 'X' ? 'text-red-400' : 'text-blue-400'
          }`"
        >
          {{ cell === "X" ? "X" : cell === "O" ? "O" : "" }}
        </div>
      </div>
    </div>
    <!-- End Of Da Game -->
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
