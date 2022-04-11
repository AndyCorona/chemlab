package com.andy.server.utils;

import org.springframework.core.convert.converter.Converter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeConverter implements Converter<String, LocalDateTime> {
    @Override
    public LocalDateTime convert(String source) {
        try {
            return LocalDateTime.parse(source, DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss"));

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
