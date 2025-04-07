const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');
const buton = document.querySelector('.buton');

getFromLocalStorage();
calculateTotal();

container.addEventListener('click', function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});

select.addEventListener('change', function(e){
    calculateTotal();
});
buton.addEventListener('click', function() {
    const selectedSeats = container.querySelectorAll('.seat.selected'); 
    selectedSeats.forEach(function(seat) {
        seat.classList.add('reserved');
        seat.classList.remove('selected'); 
    });
    calculateTotal();
});
function calculateTotal(){
    const selectedSeats = container.querySelectorAll('.seat.selected');
    const reservedSeats = container.querySelectorAll('.seat.reserved');

    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat);
    });

    seats.forEach(function(seat){
        seatsArr.push(seat);
    });


    let selectedSeatIndexs = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    });

    let reservedSeatIndexs = [];
    reservedSeats.forEach(function(seat) {
        reservedSeatIndexs.push(seatsArr.indexOf(seat));
    });

    let selectedSeatCount = container.querySelectorAll('.seat.selected').length;
    let price = select.value;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * price;

    saveToLocalStorage(selectedSeatIndexs, reservedSeatIndexs);

}

function getFromLocalStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const reservedSeats = JSON.parse(localStorage.getItem('reservedSeats'));

    seats.forEach((seat, index) => {
        if (selectedSeats.includes(index)) {
            seat.classList.add('selected');
        }
        if (reservedSeats.includes(index)) {
            seat.classList.add('reserved'); // Rezerve koltukları da işaretle
        }
    });

    
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex != null){
        select.selectedIndex = selectedMovieIndex; 
    }
}

function saveToLocalStorage(selectedSeats,reservedSeats ){
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
    localStorage.setItem('reservedSeats', JSON.stringify(reservedSeats));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}