package com.s001.cocotaxi.sse.sseemitter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
@Slf4j
public class SseEmitters {
    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    public SseEmitter add(SseEmitter emitter){
        this.emitters.add(emitter);
        log.info("new emitter added: {}", emitter);
        log.info("emitter list size: {}", emitters.size());

        emitter.onCompletion(() -> {
            log.info("Emitter completed: {}", emitter);
            this.emitters.remove(emitter); // 만료되면 리스트에서 삭제
        });

        emitter.onTimeout(()->{
            log.info("Emitter timed out: {}", emitter);
            emitter.complete();
            this.emitters.remove(emitter);
        });

        emitter.onError((throwable)->{
            log.info("onError callback");
            emitter.completeWithError(throwable);
        });

        return emitter;
    }

    void send(Object obj){
        send(emitter -> emitter.send(obj));
    }

    void send(SseEmitter.SseEventBuilder builder){
        send(emitter -> emitter.send(builder));
    }

    private void send(SseEmitterConsumer<SseEmitter> consumer) {
        List<SseEmitter> failedEmitters = new ArrayList<>();

        this.emitters.forEach(emitter -> {
            try {
                consumer.accept(emitter);
            } catch (Exception e) {
                emitter.completeWithError(e);
                failedEmitters.add(emitter);
                log.error("Emitter failed: {}", emitter, e);
            }
        });

        this.emitters.removeAll(failedEmitters);
    }

    public void removeEmitter(SseEmitter emitter) {
        emitters.remove(emitter);
    }

    public List<SseEmitter> getEmitters() {
        return emitters;
    }

    @FunctionalInterface
    private interface SseEmitterConsumer<T>{
        void accept(T t) throws IOException;
    }
}
