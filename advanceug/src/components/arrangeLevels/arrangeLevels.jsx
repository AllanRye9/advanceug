import Ple from './../levels/ple.jsx';
import Uce from './../levels/uce.jsx';
import Uace from './../levels/uace.jsx';
import Others from './../levels/others.jsx';

export default function OrganizeContent() {
  return (
    <div className="px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded">
          <Ple />
        </div>
        <div className="rounded">
          <Uce />
        </div>
        <div className="rounded">
          <Uace />
        </div>
        <div className="rounded">
          <Others />
        </div>
      </div>
    </div>
  );
}
