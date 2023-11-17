package com.s001.cocotaxi.sse.sserepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class EmitterRepository {
    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final Map<String, Object> eventCache = new ConcurrentHashMap<>();

    public SseEmitter save(String email, SseEmitter sseEmitter) {
        emitters.put(email, sseEmitter);
        return sseEmitter;
    }

    public void saveEventCache(String email, Object event) {
        eventCache.put(email, event);
    }

    public Map<String, SseEmitter> findAllSrartByEmail(String email) {
        return emitters.entrySet()
                .stream()
                .filter(entry -> entry.getKey().startsWith(email))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    public void deleteAllStartByWithEmail(String email) {
        emitters.forEach((key, emitter) -> {
            if (key.startsWith(email)) {
                emitters.remove(key);
            }
        });
    }
}