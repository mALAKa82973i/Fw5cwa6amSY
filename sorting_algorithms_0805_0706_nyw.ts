// 代码生成时间: 2025-08-05 07:06:54
 * The module is designed to be easily understandable and maintainable.
 * Error handling is included where necessary.
 */

interface Sortable<T> {
  // Interface to ensure arrays are sortable
  // with a natural order or any order defined by a compare function.
  sort(compareFn?: (a: T, b: T) => number): void;
}

class ArraySorter<T> implements Sortable<T> {

  private arr: T[];
  private compareFn: (a: T, b: T) => number;

  constructor(inputArray: T[], compareFn?: (a: T, b: T) => number) {
    this.arr = inputArray;
    this.compareFn = compareFn;
  }

  // Public method to perform the sort.
  // It delegates to the appropriate private method based on the compare function.
  public sort(compareFn?: (a: T, b: T) => number): void {
    if (compareFn) {
      this.compareFn = compareFn;
    }
    if (!this.compareFn) {
      throw new Error('No comparison function provided for sorting');
    }
    this.bubbleSort();
  }

  // Private bubble sort algorithm.
  private bubbleSort(): void {
    let isSwapped = true;
    while (isSwapped) {
      isSwapped = false;
      for (let i = 0; i < this.arr.length - 1; i++) {
        if (this.compareFn(this.arr[i], this.arr[i + 1]) > 0) {
          this.swap(i, i + 1);
          isSwapped = true;
        }
      }
    }
  }

  // Private selection sort algorithm.
  private selectionSort(): void {
    for (let i = 0; i < this.arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < this.arr.length; j++) {
        if (this.compareFn(this.arr[j], this.arr[minIndex]) < 0) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        this.swap(i, minIndex);
      }
    }
  }

  // Private quick sort algorithm.
  private quickSort(): void {
    this.quickSortHelper(0, this.arr.length - 1);
  }

  private quickSortHelper(left: number, right: number): void {
    if (left < right) {
      const pivotIndex = this.partition(left, right);
      this.quickSortHelper(left, pivotIndex - 1);
      this.quickSortHelper(pivotIndex + 1, right);
    }
  }

  private partition(left: number, right: number): number {
    const pivot = this.arr[right];
    let partitionIndex = left;
    for (let i = left; i < right; i++) {
      if (this.compareFn(this.arr[i], pivot) < 0) {
        this.swap(i, partitionIndex);
        partitionIndex++;
      }
    }
    this.swap(partitionIndex, right);
    return partitionIndex;
  }

  // Helper function to swap two elements in the array.
  private swap(i: number, j: number): void {
    [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
  }
}

// Usage example:
const numbers = [5, 3, 8, 4, 2];
const sorter = new ArraySorter(numbers);
try {
  sorter.sort((a, b) => a - b); // Sort numbers in ascending order.
  console.log(sorter.arr); // Output the sorted array.
} catch (error) {
  console.error(error);
}