
        let array = [];
        let sortingSteps = [];
        let currentStep = 0;

        function randomizeArray() {
            array = Array.from({length: 10}, () => Math.floor(Math.random() * 100));
            renderArray();
            sortingSteps = [];
            currentStep = 0;
            document.getElementById('info').textContent = '';
        }

        function renderArray() {
            const container = document.getElementById('array-container');
            container.innerHTML = '';
            array.forEach(num => {
                const element = document.createElement('div');
                element.className = 'array-element';
                element.textContent = num;
                container.appendChild(element);
            });
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
                if (arr[j] < pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    sortingSteps.push([...arr]);
                }
            }
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            sortingSteps.push([...arr]);
            return i + 1;
        }

        function sortArray() {
            sortingSteps = [];
            quickSort([...array], 0, array.length - 1);
            currentStep = 0;
        }

        function step() {
            if (currentStep < sortingSteps.length) {
                array = sortingSteps[currentStep];
                renderArray();
                currentStep++;
                document.getElementById('info').textContent = `Step ${currentStep} of ${sortingSteps.length}`;
            } else {
                document.getElementById('info').textContent = 'Sorting completed!';
            }
        }

        document.getElementById('randomize').addEventListener('click', randomizeArray);
        document.getElementById('sort').addEventListener('click', sortArray);
        document.getElementById('step').addEventListener('click', step);

        randomizeArray();
    
       