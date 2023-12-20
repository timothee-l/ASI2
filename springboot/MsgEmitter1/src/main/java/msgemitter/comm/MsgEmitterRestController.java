package msgemitter.comm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import model.Card;
import model.User;
import msgemitter.comm.controller.BusService;

@RestController
public class MsgEmitterRestController {

    @Autowired
    BusService busService;

    @RequestMapping(method = RequestMethod.POST, value = "/sendmsg/{busName}")
    public boolean sendInform(@RequestBody Card msg, @PathVariable String busName) {
        busService.sendMsg(msg,busName);
        return true;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/sendmsg")
    public boolean sendInform(@RequestBody String msg) {
        busService.sendMsg(msg);
        return true;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/sendmsg/user")
    public boolean sendInform(@RequestBody User user) {
        busService.sendUser(user);
        return true;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/sendmsg/card")
    public boolean sendInform(@RequestBody Card card) {
        busService.sendMsg(card);
        return true;
    }

}

