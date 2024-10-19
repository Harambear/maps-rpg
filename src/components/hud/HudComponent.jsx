import coin from '../../assets/icons/coin.png';
import oodles from '../../assets/icons/oodles.jpg';
import './HudComponent.scss';
import { useMap } from '@vis.gl/react-google-maps';

export default function HudComponent({ player }) {
  const map = useMap();

  return (
    <section className='hud'>
      <div
        className='hud__image-container'
        onClick={() => { map.setCenter(player.getLocation()) }}
      >
        <img src={oodles} className='hud__image'></img>
        <div className='hud__image__name'>
          {player.getName()}
        </div>
      </div>
      <div className='hud__stat-container'>
        <div className='hud__stat'>
          <div
            className='hud__stat hud__stat--health'
            style={{ width: player.getHealth() + '%' }}
          >
          </div>
          <span>
            Health {player.getHealth() + ' / 100'}
          </span>
        </div>
        <div className='hud__stat'>
          <div
            className='hud__stat hud__stat--food'
            style={{ width: player.getFood() + '%' }}
          >
          </div>
          <span>
            Food {player.getFood() + ' / 100'}
          </span>
        </div>
        <div className='hud__stat'>
          <div
            className='hud__stat hud__stat--water'
            style={{ width: player.getWater() + '%' }}
          >
          </div>
          <span>
            Water {player.getWater() + ' / 100'}
          </span>
        </div>
        <div className='hud__points'>
          <img src={coin} className='hud__points hud__points__image'></img>
          <div className='hud__points hud__points__count'>
            {player.getCoins()}
          </div>
        </div>
      </div>
    </section>
  );
}