using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using ManillenWPhone.Models;

namespace ManillenWPhone.Engine
{
    public class GameEngine
    {
        #region Fields
        private Player _player;
        private ComputerPlayer _computer;
        private bool _didPlayerDealLast = false;
        private Suit _troef;
        private bool _didBash = false;
        #endregion

        #region Properties
        public int PlayerScore { get; private set; }
        public int ComputerScore { get; private set; }
        public bool IsPlayerTurn { get; set; }
        public bool PlayingEnabled { get; set; }
        public FieldCardsModel FieldCards { get; set; }
        #endregion

        #region Public Methods
        #region Get Methods
        public ObservableCollection<Card> GetPlayerCardsDataSource()
        {
            return _player.PlayerCards;
        }

        public ObservableCollection<Card> GetPlayerUpFieldDataSource()
        {
            return _player.PlayerUpField;
        }

        public ObservableCollection<Card> GetPlayerDownFieldDataSource()
        {
            return _player.PlayerDownField;
        }

        public ObservableCollection<Card> GetComputerCardsDataSource()
        {
            return _computer.PlayerCards;
        }

        public ObservableCollection<Card> GetComputerUpFieldDataSource()
        {
            return _computer.PlayerUpField;
        }

        public ObservableCollection<Card> GetComputerDownFieldDataSource()
        {
            return _computer.PlayerDownField;
        }
        #endregion
        public GameEngine()
        {
            IsPlayerTurn = false;
            PlayerScore = 0;
            ComputerScore = 0;
            PlayingEnabled = false;
        }
        public void StartNewRound()
        {
            Deal();
            OnShouldMakeTroef(this);

        }
        public async void PlayCard(Card card)
        {
            PlayingEnabled = false;
            if (FieldCards[0].Number == 0 && FieldCards[1].Number == 0)
            {
                if (IsPlayerTurn)
                {
                    FieldCards[0] = card;
                    _player.PlayCard(card);
                    OnFieldCardsChanged(this);
                    IsPlayerTurn = !IsPlayerTurn;
                    PlayCard(_computer.ComputerDoMove(card, _troef));
                }
                else
                {
                    _computer.PlayCard(card);
                    FieldCards[1] = card;
                    IsPlayerTurn = !IsPlayerTurn;
                    OnFieldCardsChanged(this);
                    PlayingEnabled = true;
                }
            }
            else
            {
                bool allowed = false;
                allowed = FieldCards[0].Number == 0 ? _player.PlayCard(card, FieldCards[1], _troef) : _computer.PlayCard(card, FieldCards[0], _troef);
                if (!allowed)
                {
                    OnWrongCardPlayed(this);
                    PlayingEnabled = true;
                    return;
                }
                if (FieldCards[0].Number == 0)
                    FieldCards[0] = card;
                else
                    FieldCards[1] = card;

                OnFieldCardsChanged(this);
                if (FieldCards.DidPlayerWinTurn(_troef, IsPlayerTurn))
                {
                    _player.AddPlayerScoredCards(FieldCards[0]);
                    _player.AddPlayerScoredCards(FieldCards[1]);
                    IsPlayerTurn = true;
                    OnTurnIsOver(this, new TurnIsOverEventArgs() { DidPlayerWin = true });
                }
                else
                {
                    _computer.AddPlayerScoredCards(FieldCards[0]);
                    _computer.AddPlayerScoredCards(FieldCards[1]);
                    IsPlayerTurn = false;
                    OnTurnIsOver(this, new TurnIsOverEventArgs() { DidPlayerWin = false });
                }
                await Task.Delay(2000);
                FieldCards.EmptyCards();
                OnFieldCardsChanged(this);
                PlayingEnabled = true;

                if (_player.IsOutOfCards())
                {
                    OnRoundIsOver();
                    return;
                }
                if (!IsPlayerTurn)
                    PlayCard(_computer.ComputerDoMove());
            }
        }
        public void SetTroef(Suit troef)
        {
            _troef = troef;
            OnTroefChanged(this, new TroefChangedEventArgs(){Troef = troef});
            PlayingEnabled = true;
            if (!IsPlayerTurn)
                PlayCard(_computer.ComputerDoMove());
        }
        #endregion

        #region events
        public event ShouldMakeTroefEventHandler ShouldMakeTroef;
        public event TroefChangedEventHandler TroefChanged;
        public event TurnIsOverEventHandler TurnIsOver;
        public event ShouldChooseToBashEventHandler SHouldChoseToBash;
        public event RoundIsOverEventHandler RoundIsOver;
        public event WrongCardPlayedEventHandler WrongCardPlayed;
        public event GameIsOverEventHandler GameIsOver;
        public event DealedNewCardEventHandler PlayerDealedNewCard;
        public event DealedNewCardEventHandler ComputerDealedNewCard;
        public event FieldCardsChangedEventHandler FieldCardsChanged;
        #endregion

        #region Virtual Method
        protected virtual void OnShouldMakeTroef(object sender)
        {
            if (IsPlayerTurn)
                SetTroef(_computer.ChooseTroef());
            else if(ShouldMakeTroef != null)
                ShouldMakeTroef(sender);
        }
        protected virtual void OnTroefChanged(object sender, TroefChangedEventArgs e)
        {
            if (TroefChanged != null)
                TroefChanged(sender, e);
        }
        protected virtual void OnTurnIsOver(object sender, TurnIsOverEventArgs e)
        {
            if (TurnIsOver != null)
                TurnIsOver(sender, e);
        }
        protected virtual void OnRoundIsOver()
        {

            int score = _player.GetScore();
            bool didPlayerWin = false;
            if (score > 30)
            {
                score -= 30;
                if (_troef == Suit.None)
                    score *= 2;
                PlayerScore += score;
                didPlayerWin = true;
            }
            else
            {
                score = 30 - score;
                if (_troef == Suit.None)
                    score *= 2;
                ComputerScore += score;
            }
            bool gameEnd = ComputerScore >= 101 || PlayerScore >= 101;
            if (gameEnd)
            {
                OnGameIsOver(score, didPlayerWin);
                return;
            }
            if (RoundIsOver != null)
                RoundIsOver(this, new RoundIsOverEventArgs() { DidPlayerWin = didPlayerWin, Score = score, ComputerScore = ComputerScore, PlayerScore = PlayerScore });
        }
        protected virtual void OnWrongCardPlayed(object sender)
        {
            if (WrongCardPlayed != null)
                WrongCardPlayed(sender);
        }
        protected virtual void OnGameIsOver(int score, bool didPlayerWin)
        {
            if (GameIsOver != null)
                GameIsOver(this, new GameIsOverEventArgs() { DidPlayerWin = didPlayerWin, Score = score, ComputerScore = ComputerScore, PlayerScore = PlayerScore });
        }
        protected virtual void OnPlayerDealedNewCard(object sender)
        {
            if (PlayerDealedNewCard != null)
                PlayerDealedNewCard(sender);
        }
        protected virtual void OnComputerDealedNewCard(object sender)
        {
            if (ComputerDealedNewCard != null)
                ComputerDealedNewCard(sender);
        }
        protected virtual void OnFieldCardsChanged(object sender)
        {
            if (FieldCardsChanged != null)
                FieldCardsChanged(sender);
        }
        #endregion

        #region Private Methods
        private void Deal()
        {
            _didBash = false;
            _player = new Player();
            _computer = new ComputerPlayer();
            _player.DealedNewCard += OnPlayerDealedNewCard;
            _computer.DealedNewCard += OnComputerDealedNewCard;
            FieldCards = new FieldCardsModel();
            List<Card> deck = new List<Card>();
            for (byte i = 7; i < 15; i++)
            {
                byte i1 = i;
                deck.AddRange(from Suit suit in Enum.GetValues(typeof (Suit)) where suit != Suit.None select new Card() {Number = i1, Suit = suit});
            }
            Random random = new Random();


            if (!_didPlayerDealLast)
            {
                #region Player Is Dealing
                #region First Hand Cards
                for (int i = 0; i < 3; i++)
                {
                    int place = random.Next(0, deck.Count - 1);
                    _computer.AddPlayerCard(deck[place]);
                    deck.RemoveAt(place);
                }
                for (int i = 0; i < 3; i++)
                {
                    int place = random.Next(0, deck.Count - 1);
                    _player.AddPlayerCard(deck[place]);
                    deck.RemoveAt(place);
                }
                #endregion
                #region Faced Down Cards
                for (int i = 0; i < 4; i++)
                {
                    int place = random.Next(0, deck.Count - 1);
                    _computer.AddPlayerDownFieldCard(deck[place]);
                    deck.RemoveAt(place);
                    place = random.Next(0, deck.Count - 1);
                    _player.AddPlayerDownFieldCard(deck[place]);
                    deck.RemoveAt(place);
                }
                #endregion
                #region Second Hand Cards
                for (int i = 0; i < 2; i++)
                {
                    int place = random.Next(0, deck.Count - 1);
                    _computer.AddPlayerCard(deck[place]);
                    deck.RemoveAt(place);
                }
                for (int i = 0; i < 2; i++)
                {
                    int place = random.Next(0, deck.Count - 1);
                    _player.AddPlayerCard(deck[place]);
                    deck.RemoveAt(place);
                }
                #endregion
                #region Faced Up Cards
                for (int i = 0; i < 4; i++)
                {
                    int place = random.Next(0, deck.Count - 1);
                    _computer.AddPlayerUpFieldCard(deck[place]);
                    deck.RemoveAt(place);
                    place = random.Next(0, deck.Count - 1);
                    _player.AddPlayerUpFieldCard(deck[place]);
                    deck.RemoveAt(place);
                }
                #endregion
                #region Third Hand Cards
                for (int i = 0; i < 3; i++)
                {
                    int place = random.Next(0, deck.Count - 1);
                    _computer.AddPlayerCard(deck[place]);
                    deck.RemoveAt(place);
                }
                for (int i = 0; i < 3; i++)
                {
                    int place = random.Next(0, deck.Count - 1);
                    _player.AddPlayerCard(deck[place]);
                    deck.RemoveAt(place);
                }
                #endregion
                #endregion
                _player.SortPlayersHand();
                _didPlayerDealLast = true;
                IsPlayerTurn = false;
                return;
            }
            #region Computer Is Dealing
            #region First Hand Cards
            for (int i = 0; i < 3; i++)
            {
                int place = random.Next(0, deck.Count - 1);
                _player.AddPlayerCard(deck[place]);
                deck.RemoveAt(place);
            }
            for (int i = 0; i < 3; i++)
            {
                int place = random.Next(0, deck.Count - 1);
                _computer.AddPlayerCard(deck[place]);
                deck.RemoveAt(place);
            }
            #endregion
            #region Faced Down Cards
            for (int i = 0; i < 4; i++)
            {
                int place = random.Next(0, deck.Count - 1);
                _player.AddPlayerDownFieldCard(deck[place]);
                deck.RemoveAt(place);
                place = random.Next(0, deck.Count - 1);
                _computer.AddPlayerDownFieldCard(deck[place]);
                deck.RemoveAt(place);
            }
            #endregion
            #region Second Hand Cards
            for (int i = 0; i < 2; i++)
            {
                int place = random.Next(0, deck.Count - 1);
                _player.AddPlayerCard(deck[place]);
                deck.RemoveAt(place);
            }
            for (int i = 0; i < 2; i++)
            {
                int place = random.Next(0, deck.Count - 1);
                _computer.AddPlayerCard(deck[place]);
                deck.RemoveAt(place);
            }
            #endregion
            #region Faced Up Cards
            for (int i = 0; i < 4; i++)
            {
                int place = random.Next(0, deck.Count - 1);
                _player.AddPlayerUpFieldCard(deck[place]);
                deck.RemoveAt(place);
                place = random.Next(0, deck.Count - 1);
                _computer.AddPlayerUpFieldCard(deck[place]);
                deck.RemoveAt(place);
            }
            #endregion
            #region Third Hand Cards
            for (int i = 0; i < 3; i++)
            {
                int place = random.Next(0, deck.Count - 1);
                _player.AddPlayerCard(deck[place]);
                deck.RemoveAt(place);
            }
            for (int i = 0; i < 3; i++)
            {
                int place = random.Next(0, deck.Count - 1);
                _computer.AddPlayerCard(deck[place]);
                deck.RemoveAt(place);
            }

            #endregion
            _player.SortPlayersHand();
            IsPlayerTurn = true;
            _didPlayerDealLast = false;

            #endregion

        }
        #endregion
    }
}