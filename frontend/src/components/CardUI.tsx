import React, { useState } from 'react';

function CardUI() {
  const _ud = localStorage.getItem('user_data');
  const { id: userId } = JSON.parse(_ud || '{}');

  const [search, setSearch] = useState('');
  const [card, setCard] = useState('');
  const [message, setMessage] = useState('');
  const [cardList, setCardList] = useState('');

  async function addCard(e: React.MouseEvent) {
    e.preventDefault();
    const obj = { userId, card };
    const js = JSON.stringify(obj);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/addcard`, {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });
      const res = await response.json();
      if (res.error) setMessage(`Error: ${res.error}`);
      else setMessage('Card added!');
    } catch (err: any) {
      setMessage(err.toString());
    }
  }

  async function searchCard(e: React.MouseEvent) {
    e.preventDefault();
    const obj = { userId, search };
    const js = JSON.stringify(obj);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/searchcards`, {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });
      const res = await response.json();
      setCardList(res.results.join(', '));
    } catch (err: any) {
      setMessage(err.toString());
    }
  }

  return (
    <div>
      Search: <input onChange={e => setSearch(e.target.value)} />
      <button onClick={searchCard}>Search</button><br />
      {cardList}<br /><br />
      Add: <input onChange={e => setCard(e.target.value)} />
      <button onClick={addCard}>Add</button><br />
      {message}
    </div>
  );
}

export default CardUI;

  