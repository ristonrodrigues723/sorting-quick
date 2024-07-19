let array = [];
let sortingSteps = [];
let currentStep = 0;
let comparisons = 0;
let swaps = 0;

function addNumber() {
    const input = document.getElementById('numberInput');
    const number = parseInt(input.value);
    if (!isNaN(number)) {
        array.push(number);
        input.value = '';
        updateArray();
    }
}

function generateRandomArray() {
    const size = Math.floor(Math.random() * 10) + 5; // Random size between 5 and 14
    array = Array.from({length: size}, () => Math.floor(Math.random() * 100));
    updateArray();
}

function clearArray() {
    array = [];
    updateArray();
}

function updateArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    array.forEach((num, index) => {
        const box = document.createElement('div');
        box.className = 'box';
        box.textContent = num;
        container.appendChild(box);
    });
    document.getElementById('arraySize').textContent = array.length;
    resetStats();
}

function resetStats() {
    comparisons = 0;
    swaps = 0;
    document.getElementById('comparisons').textContent = comparisons;
    document.getElementById('swaps').textContent = swaps;
}

function runQuickSort() {
    sortingSteps = [];
    comparisons = 0;
    swaps = 0;
    quickSort(array, 0, array.length - 1);
    currentStep = 0;
    updateMessage("Quicksort steps prepared. Click 'Step' to go through the sorting process.");
}

function quickSort(arr, low, high) {
    if (low < high) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        comparisons++;
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            swaps++;
            sortingSteps.push({array: [...arr], pivot: high, swapped: [i, j]});
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps++;
    sortingSteps.push({array: [...arr], pivot: i + 1, swapped: [i + 1, high]});
    return i + 1;
}

function step() {
    if (currentStep < sortingSteps.length) {
        const step = sortingSteps[currentStep];
        array = step.array;
        updateArrayVisual(step.pivot, step.swapped);
        currentStep++;
        document.getElementById('comparisons').textContent = comparisons;
        document.getElementById('swaps').textContent = swaps;
        updateMessage(`Step ${currentStep} of ${sortingSteps.length}`);
    } else {
        updateMessage("Sorting completed!");
    }
}

function updateArrayVisual(pivotIndex, swappedIndices) {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    array.forEach((num, index) => {
        const box = document.createElement('div');
        box.className = 'box';
        if (index === pivotIndex) {
            box.classList.add('pivot');
        }
        if (swappedIndices.includes(index)) {
            box.classList.add('selected');
        }
        box.textContent = num;
        container.appendChild(box);
    });
}

function updateMessage(message) {
    document.getElementById('messageContainer').textContent = message;
}

// Initialize
updateArray();