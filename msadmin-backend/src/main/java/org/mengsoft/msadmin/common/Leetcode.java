package org.mengsoft.msadmin.common;

import java.util.HashMap;
import java.util.Map;

public class Leetcode {
    public static int maxFrequencyElementCount(int[] nums) {
        // Map to store the frequency of each element
        Map<Integer, Integer> frequencyMap = new HashMap<>();

        // Count the frequency of each element
        for (int num : nums) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }

        // Find the maximum frequency
        int maxFrequency = 0;
        for (int freq : frequencyMap.values()) {
            if (freq > maxFrequency) {
                maxFrequency = freq;
            }
        }

        // Count how many elements have the maximum frequency
        int maxFrequencyCount = 0;
        for (int freq : frequencyMap.values()) {
            if (freq == maxFrequency) {
                maxFrequencyCount++;
            }
        }

        return maxFrequencyCount;
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 2, 3, 1, 4}; // Example input
        System.out.println("Total frequencies of elements with max frequency: " + maxFrequencyElementCount(nums));
    }
}
