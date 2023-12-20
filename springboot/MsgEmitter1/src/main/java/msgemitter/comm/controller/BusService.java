package msgemitter.comm.controller;

import model.User;
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

    public void sendMsg(String msg) {
        System.out.println("[BUSSERVICE] SEND String MSG=["+msg+"] to Bus=["+msg+"]");
        jmsTemplate.convertAndSend("RESULT_BUS_MNG",msg);
    }

    public void sendUser(User user) {
        System.out.println("[BUSSERVICE] SEND String USER=["+user+"]");
        jmsTemplate.convertAndSend("user", user);
    }
}

