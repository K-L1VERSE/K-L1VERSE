package com.KL1verse.Crawl;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class CrawlApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrawlApplication.class, args);
	}

}
