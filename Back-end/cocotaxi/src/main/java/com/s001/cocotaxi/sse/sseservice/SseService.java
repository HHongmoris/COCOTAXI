package com.s001.cocotaxi.sse.sseservice;

import com.s001.cocotaxi.sse.sserepository.EmitterRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
public class SseService {

    // 일단 쓰지 않는 걸로...

    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60; // 유효기간
    private EmitterRepository emitterRepository;

    public SseEmitter connection(String lastEventId, String userEmail) {

        String email = userEmail + "_" + System.currentTimeMillis(); // 데이터 유실 시점 파악

        // SseEmitter 객체 생성
        // 유효시간 지정으로 시간이 지나면 클라이언트에서 자동으로 재연결 요청
        SseEmitter emitter = emitterRepository.save(email, new SseEmitter(DEFAULT_TIMEOUT));

        // SseEmitter의 완료 / 시간초과/ 에러로인한 전송 불가 시 sseEmitter 삭제
        emitter.onCompletion(() -> emitterRepository.deleteAllStartByWithEmail(email));
        emitter.onTimeout(() -> emitterRepository.deleteAllStartByWithEmail(email));
        emitter.onError((e) -> emitterRepository.deleteAllStartByWithEmail(email));

        // sendToClient(); // 데이터 보내주는 메소드이니까 알아서 해...

//		if (!lastEventId.isEmpty()) {
//			// 클라이언트가 미수신한 Event 유실 예방, 연결이 끊겼거나 미수신된 데이터를 다 찾아서 보내준다.
//			Map<String, SseEmitter> events = emitterRepository.findAllSrartByEmail(email);
//			events.entrySet()
//				.stream()
//				.filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
//				.forEach(entry -> sendToClient(emitter, entry.getKey(), entry.getValue()));
//		}

        return emitter;
    }

    public void sendToClient(SseEmitter emitter, String email, Object data, String eventName) {
        try {
            emitter.send(SseEmitter.event().id(email).name(eventName).data(data));
        } catch (Exception e) {
            emitterRepository.deleteAllStartByWithEmail(email);
        }
    }

}