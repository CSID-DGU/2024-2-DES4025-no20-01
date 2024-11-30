package dgu.notwenty;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class NotwentyApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotwentyApplication.class, args);
	}

}
