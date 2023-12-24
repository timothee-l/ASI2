package com.cpe.springboot.card.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import com.cpe.springboot.card.model.CardModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import com.cpe.springboot.card.model.CardReference;

@Service
public class CardReferenceService {
	
	private final CardRefRepository cardRefRepository;
	
	public CardReferenceService(CardRefRepository cardRefRepository) {
		this.cardRefRepository=cardRefRepository;
	}

	public List<CardReference> getAllCardRef() {
		List<CardReference> cardRefList = new ArrayList<>();
		cardRefRepository.findAll().forEach(cardRefList::add);
		return cardRefList;
	}

	public void addCardRef(CardReference cardRef) {
		cardRefRepository.save(cardRef);
	}

	public void updateCardRef(CardReference cardRef) {
		cardRefRepository.save(cardRef);

	}

	public CardReference getRandCardRef() {
		List<CardReference> cardRefList=getAllCardRef();
		if( cardRefList.size()>0) {
			Random rand=new Random();
			int rindex=rand.nextInt(cardRefList.size()-1);
			return cardRefList.get(rindex);
		}
		return null;
	}

	/**
	 * Executed after application start
	 */
	@EventListener(ApplicationReadyEvent.class)
	public void doInitAfterStartup() {

		CardReference card1 = new CardReference("jaune salami", "blabla", "", "", "https://avatars.githubusercontent.com/u/8275121?v=4", "https://avatars.githubusercontent.com/u/8275121?v=4");
		CardReference card2 = new CardReference("simpleton", "blabla", "", "", "https://scontent-mrs2-2.xx.fbcdn.net/v/t1.6435-9/85000362_1605899209550356_8188280404508147712_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7a1959&_nc_ohc=KSqVZlz_9JkAX9iBQ19&_nc_ht=scontent-mrs2-2.xx&oh=00_AfAojNpJ_tKhv-44Qx8eDerEybx-ATOkaIo1dhA6LHVbwg&oe=659A6B4F", "https://scontent-mrs2-2.xx.fbcdn.net/v/t1.6435-9/85000362_1605899209550356_8188280404508147712_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7a1959&_nc_ohc=KSqVZlz_9JkAX9iBQ19&_nc_ht=scontent-mrs2-2.xx&oh=00_AfAojNpJ_tKhv-44Qx8eDerEybx-ATOkaIo1dhA6LHVbwg&oe=659A6B4F");
		CardReference card3 = new CardReference("mancrede taillot", "", "", "", "https://scontent-mrs2-1.xx.fbcdn.net/v/t1.6435-9/121161207_3187896394656308_5565297729236125609_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7a1959&_nc_ohc=KuiGXYFsUxUAX94jAFQ&_nc_ht=scontent-mrs2-1.xx&oh=00_AfDRQ4ULHY-RTGo-iBpDON6BwfZNZHsGYparl8EHiXAxGg&oe=65A0E9BC", "https://scontent-mrs2-1.xx.fbcdn.net/v/t1.6435-9/121161207_3187896394656308_5565297729236125609_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7a1959&_nc_ohc=KuiGXYFsUxUAX94jAFQ&_nc_ht=scontent-mrs2-1.xx&oh=00_AfDRQ4ULHY-RTGo-iBpDON6BwfZNZHsGYparl8EHiXAxGg&oe=65A0E9BC");
		CardReference card4 = new CardReference("piloté chantilly", "", "", "", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.e7SfNbg3bjwP8hiX5DHYCwHaFj%26pid%3DApi&f=1&ipt=3f6e701767a853f6a422e28f782e82ab63fe50c96e4393749070122420c5eb31&ipo=images", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.e7SfNbg3bjwP8hiX5DHYCwHaFj%26pid%3DApi&f=1&ipt=3f6e701767a853f6a422e28f782e82ab63fe50c96e4393749070122420c5eb31&ipo=images");
		CardReference card5 = new CardReference("tyrannosorre", "blabla", "", "", "https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=50,format=auto/sources/tyrannosaurus-warpaintcobra-AdobeStock.jpg", "https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=50,format=auto/sources/tyrannosaurus-warpaintcobra-AdobeStock.jpg");

		addCardRef(card1);
		addCardRef(card2);
		addCardRef(card3);
		addCardRef(card4);
		addCardRef(card5);
	}
	
}
