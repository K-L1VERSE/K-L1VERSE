//package com.kl1verse.UserServer.global.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.EnableWebMvc;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//@EnableWebMvc
//public class WebConfig implements WebMvcConfigurer {
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOriginPatterns("http://localhost:3000","http://127.0.0.1:3000")
//                .allowedHeaders("*")
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                .exposedHeaders("Authorization")
//                .allowCredentials(true)
//                .maxAge(3000);
//    }
//}
