import PleButton from '../levels/pleButton.jsx';
import UceButton from '../levels/uceButton.jsx';
import UaceButton from '../levels/uaceButton.jsx';
import OthersButton from '../levels/othersButton.jsx';

export default function OrganizeContent() {
  return (
    <div className="px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded">
          <PleButton />
        </div>
        <div className="rounded">
          <UceButton />
        </div>
        <div className="rounded">
          <UaceButton />
        </div>
        <div className="rounded">
          <OthersButton />
        </div>
      </div>
    </div>
  );
}
