package com.example.demo.debug;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class DebugLogger {

    private static final String SESSION_ID = "802110";
    private static final Path LOG_PATH = Path.of("debug-802110.log");

    public static void log(String hypothesisId, String runId, String location, String message, String data) {
        long now = System.currentTimeMillis();
        String id = "log_" + now + "_" + Math.round(Math.random() * 100000);
        String safeData = data == null ? "" : data.replace("\"", "'");

        String json = String.format(
                "{\"sessionId\":\"%s\",\"id\":\"%s\",\"timestamp\":%d," +
                        "\"location\":\"%s\",\"message\":\"%s\",\"data\":\"%s\"," +
                        "\"runId\":\"%s\",\"hypothesisId\":\"%s\"}%n",
                SESSION_ID,
                id,
                now,
                location,
                message.replace("\"", "'"),
                safeData,
                runId,
                hypothesisId
        );

        try {
            Files.write(LOG_PATH,
                    json.getBytes(StandardCharsets.UTF_8),
                    StandardOpenOption.CREATE,
                    StandardOpenOption.APPEND);
        } catch (IOException ignored) {
        }
    }
}

