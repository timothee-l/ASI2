package msgemitter.comm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import model.Card;

@Service
public class BusService {

    @Autowired
    JmsTemplate jmsTemplate;

    public void sendMsg(Card card) {
        System.out.println("[BUSSERVICE] SEND String MSG=["+card+"]");
        jmsTemplate.convertAndSend("RESULT_BUS_MNG",card);
    }

    public void sendMsg(Card card, String busName) {
        System.out.println("[BUSSERVICE] SEND String MSG=["+card+"] to Bus=["+card+"]");
        jmsTemplate.convertAndSend(busName,card);
    }
}

