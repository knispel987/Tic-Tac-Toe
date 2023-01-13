<script setup>
import { ref, computed } from "vue";
import Watermark from "./components/Watermark.vue";

const player = ref("X");
const board = ref([
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]);
// Kode ini mendefinisikan sebuah fungsi yang disebut CalculateWinner yang mengambil
// parameter bernama board,
// yang diasumsikan sebagai sebuah array dari string yang mewakili keadaan saat ini
// dari permainan tic-tac-toe.
// Fungsi tersebut pertama-tama mendefinisikan sebuah konstanta yang disebut lines,
// yang merupakan sebuah array dari array.
// Setiap sub-array mewakili kombinasi pemenang dari kotak-kotak pada papan tic-tac-toe.
//  Misalnya, sub-array pertama [0, 1, 2] mewakili baris atas dari papan,
// dan sub-array terakhir [2, 4, 6] mewakili diagonal dari kanan atas ke kiri bawah.
// Fungsi kemudian menggunakan loop for untuk mengiterasi setiap sub-array dalam array lines.
//  Dalam loop, fungsi menggunakan pengambilan nilai untuk mengambil nilai dari sub-array saat
// ini menjadi variabel a, b, dan c. Variabel ini mewakili indeks dari kotak-kotak pada papan
// yang membentuk kombinasi pemenang saat ini.
// Kemudian fungsi memeriksa apakah nilai dari board[a] benar dan jika sama dengan nilai
// dari board[b] dan board[c]. Jika kedua kondisi benar, itu berarti bahwa kotak-kotak pada
// indeks a, b, dan c semuanya ditempati oleh pemain yang sama dan pemain tersebut memenangkan
//  permainan. Dalam hal ini, fungsi mengembalikan nilai dari pemain pemenang dari array board.
// Jika loop selesai tanpa menemukan kombinasi pemenang, fungsi mengembalikan null yang berarti
// permainan belum selesai atau seri.
//  |    |    |
// \/   \/   \/
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
  return null;
};

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
  <main
    class="pt-8 text-center h-screen bg-gradient-to-r from-cyan-500 via-violet-500 to-blue-500"
  >
    <h1 class="mb-8 text-3xl font-bold uppercase">Tic Tac Toe</h1>

    <h3 class="text-xl mb-4">Player {{ player }}'s turn</h3>

    <div class="flex flex-col items-center mb-8">
      <div v-for="(row, x) in board" :key="x" class="flex">
        <div
          v-for="(cell, y) in row"
          :key="y"
          @click="MakeMove(x, y)"
          :class="`border-8 outline-double  w-24 h-24 hover:bg-indigo-500 flex items-center justify-center text-4xl cursor-pointer ${
            cell === 'X' ? 'text-red-800' : 'text-indigo-800'
          }`"
        >
          {{ cell === "X" ? "X" : cell === "O" ? "O" : "" }}
        </div>
      </div>
    </div>

    <div class="text-center">
      <p v-if="winner" class="text-6xl font-bold mb-8">Player '{{ winner }}' wins!</p>
      <button
        @click="ResetGame"
        class="px-4 py-2 bg-pink-500 rounded uppercase font-bold hover:bg-pink-600 duration-300"
      >
        Reset
      </button>
    </div>
    <!-- <Watermark /> -->
  </main>
</template>
