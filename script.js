// função para formatar o relógio em 12h ou 24h
function formatTime(hours, minutes, seconds, format) {
  if (format === '12h') {
    const suffix = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) hours = 12; // ajusta para 12h
    return `${hours}:${minutes}:${seconds} ${suffix}`;
  } else {
    return `${hours}:${minutes}:${seconds}`;
  }
}

// função para formatar a data no estilo "segunda, 05 de fevereiro de 2024"
function formatDate(date) {
  const days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  const dayName = days[date.getDay()]; // nome do dia da semana
  const day = date.getDate(); // número do dia
  const month = months[date.getMonth()]; // nome do mês
  const year = date.getFullYear(); // ano

  return `${dayName}, ${day} de ${month} de ${year}`;
}

// Função para atualizar o relógio
function updateClock() {
  const clock = document.getElementById('clock');
  const dateElement = document.getElementById('date');
  const formatSelect = document.getElementById('format-select');
  const timezoneSelect = document.getElementById('timezone-select');

  const timezoneOffset = parseInt(timezoneSelect.value); // para pegar o fuso horário
  const format = formatSelect.value; // pega o formato de 12h ou 24h

  const now = new Date();
  const utcHours = now.getUTCHours(); // pega a hora UTC real
  let hours = (utcHours + timezoneOffset + 24) % 24; // ajusta o fuso horário
  let minutes = now.getUTCMinutes(); // pega minutos em UTC
  let seconds = now.getUTCSeconds(); // pega segundos em UTC

  // ajusta os minutos e segundos para o formato desejado
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  // formata a hora no formato de 12h ou 24h
  let timeString = '';
  if (format === '12h') {
    const suffix = hours >= 12 ? '<span class="suffix">PM</span>' : '<span class="suffix">AM</span>';
    hours = hours % 12;
    if (hours === 0) hours = 12; // ajusta para 12h
    timeString = `<span>${hours}</span><span class="colon">:</span><span>${minutes}</span><span class="colon">:</span><span>${seconds}</span> ${suffix}`;
  } else {
    timeString = `<span>${hours}</span><span class="colon">:</span><span>${minutes}</span><span class="colon">:</span><span>${seconds}</span>`;
  }

  clock.innerHTML = timeString;  // Atualiza o conteúdo do relógio

  // Formata a data
  dateElement.textContent = formatDate(new Date(now.getTime() + timezoneOffset * 3600000));
}

// chama a função para atualizar a cada segundo
setInterval(updateClock, 1000);

updateClock();  // chama uma vez no início para definir o horário corretamente