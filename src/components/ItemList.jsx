const ItemList = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((item) => {
        const info = item.card.info;

        return (
          <div
            key={info.id}
            className="flex justify-between items-start bg-[#161616] rounded-xl p-5 border border-gray-800 hover:border-gray-700 transition"
          >
            <div className="flex-1 pr-6">
              <h3 className="text-xl font-semibold text-white">{info.name}</h3>

              <p className="text-lg font-bold text-white mt-2">
                ₹{(info.price || info.defaultPrice) / 100}
              </p>

              {info.ratings?.aggregatedRating?.rating && (
                <p className="text-green-400 text-sm mt-2">
                  ★ {info.ratings.aggregatedRating.rating}
                </p>
              )}

              {info.description && (
                <p className="text-gray-400 text-sm mt-3 line-clamp-3">
                  {info.description}
                </p>
              )}
            </div>

            {info.imageId && (
              <div className="w-36 h-36 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/${info.imageId}`}
                  alt={info.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
