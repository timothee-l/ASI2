package msgreceiver.comm.controller;

import javax.jms.Message;

import model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

import model.Card;

@Component
public class BusListener {

    @Autowired
    JmsTemplate jmsTemplate;

    @JmsListener(destination = "RESULT_BUS_MNG", containerFactory = "connectionFactory")
    public void receiveMessageResult(Card card, Message message) {

            System.out.println("[BUSLISTENER] [CHANNEL RESULT_BUS_MNG] RECEIVED Message MSG=["+card+"]");

    }

    @JmsListener(destination = "A", containerFactory = "connectionFactory")
    public void receiveMessageA(Card card, Message message) {

        System.out.println("[BUSLISTENER] [CHANNEL A] RECEIVED Card MSG=["+card+"]");

    }

    @JmsListener(destination = "B", containerFactory = "connectionFactory")
    public void receiveMessageB(Card card, Message message) {

        System.out.println("[BUSLISTENER] [CHANNEL B] RECEIVED Card MSG=["+card+"]");

    }

    @JmsListener(destination = "user", containerFactory = "connectionFactory")
    public void receiveUser(User user) {

        System.out.println("[BUSLISTENER] [CHANNEL USER] RECEIVED User=["+user+"]");

    }
}


