package com.KL1verse.TestData;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TestDataApplication {

	public static void main(String[] args) {
		SpringApplication.run(TestDataApplication.class, args);
	}

}
