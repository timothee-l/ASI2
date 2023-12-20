package com.cpe.springboot.card.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cpe.springboot.card.model.CardDTO;
import com.cpe.springboot.card.model.CardModel;
import com.cpe.springboot.card.model.CardReference;
import com.cpe.springboot.common.tools.DTOMapper;
import com.cpe.springboot.user.model.UserModel;

import javax.annotation.PostConstruct;

@Service
public class CardModelService {
	private final CardModelRepository cardRepository;
	private final CardReferenceService cardRefService;
	private Random rand;

	@PostConstruct
    public void init() {
        // Initialize CardModel tables
        CardModel card1 = new CardModel("jaune salami", "blabla", "", "", 10, 20,
			20, 30, "https://avatars.githubusercontent.com/u/8275121?v=4", "", 100);
		cardRepository.save(card1);
		// CardModel card2 = CardModel(String name, String description, String family, String affinity, float energy, float hp,
		// 	float defence, float attack,String imgUrl,String smallImg,float price)
        // CardModel card3 = CardModel(String name, String description, String family, String affinity, float energy, float hp,
		// 	float defence, float attack,String imgUrl,String smallImg,float price)
		// CardModel card4 = CardModel(String name, String description, String family, String affinity, float energy, float hp,
		// 	float defence, float attack,String imgUrl,String smallImg,float price)			
    }

	public CardModelService(CardModelRepository cardRepository,CardReferenceService cardRefService) {
		this.rand=new Random();
		// Dependencies injection by constructor
		this.cardRepository=cardRepository;
		this.cardRefService=cardRefService;
	}
	
	public List<CardModel> getAllCardModel() {
		List<CardModel> cardList = new ArrayList<>();
		cardRepository.findAll().forEach(cardList::add);
		return cardList;
	}

	public CardDTO addCard(CardModel cardModel) {
		CardModel cDb=cardRepository.save(cardModel);
		return DTOMapper.fromCardModelToCardDTO(cDb);
	}

	public void updateCardRef(CardModel cardModel) {
		cardRepository.save(cardModel);

	}
	public CardDTO updateCard(CardModel cardModel) {
		CardModel cDb=cardRepository.save(cardModel);
		return DTOMapper.fromCardModelToCardDTO(cDb);
	}
	public Optional<CardModel> getCard(Integer id) {
		return cardRepository.findById(id);
	}
	
	public void deleteCardModel(Integer id) {
		cardRepository.deleteById(id);
	}
	
	public List<CardModel> getRandCard(int nbr){
		List<CardModel> cardList=new ArrayList<>();
		for(int i=0;i<nbr;i++) {
			CardReference currentCardRef=cardRefService.getRandCardRef();
			CardModel currentCard=new CardModel(currentCardRef);
			currentCard.setAttack(rand.nextFloat()*100);
			currentCard.setDefence(rand.nextFloat()*100);
			currentCard.setEnergy(100);
			currentCard.setHp(rand.nextFloat()*100);
			currentCard.setPrice(currentCard.computePrice());
			//save new card before sending for user creation
			//this.addCard(currentCard);
			cardList.add(currentCard);
		}
		return cardList;
	}


	public List<CardModel> getAllCardToSell(){
		return this.cardRepository.findByUser(null);
	}
}

