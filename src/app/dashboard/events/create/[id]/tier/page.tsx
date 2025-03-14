'use client'

import { useState, useEffect, ChangeEvent } from "react";
import {
  Trash,
  Plus,
  Crown,
  Medal,
  Ticket,
  Image as ImageIcon,
  X,
  icons,
  LucideIcon
} from 'lucide-react'
import Breadcrumb from "@/components/ui/Breadcrumb";

type IconType = 'image' | 'icon' | 'library';
type IconColor = string;

interface TicketTier {
  id: string;
  name: string;
  price: number;
  capacity: number;
  onlineCapacity?: number;
  currency?: string; // properti currency ditambahkan
  icon: React.ReactNode;
  iconType: IconType;
  iconColor: IconColor;
  iconUrl?: string;
  iconName?: string;
  benefits: string[];
  error?: string;
}

interface Capacity {
  total: number;
  onlineTotal?: number;
  grandTotal?: number;
  remaining: number;
  error?: string;
}

type LocationFormat = 'online' | 'ofsite' | 'hybrid';
type TicketTierUpdateValue = string | number | React.ReactNode | IconType | IconColor;

const iconList = Object.entries(icons).map(([name, Icon]) => ({
  name,
  component: Icon as LucideIcon
}));

const defaultTiers: TicketTier[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    price: 0,
    capacity: 0,
    onlineCapacity: 0,
    currency: "Rp", // nilai default currency
    icon: <Medal className="h-5 w-5" />,
    iconType: 'icon',
    iconColor: '#4B5563',
    benefits: []
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 0,
    capacity: 0,
    onlineCapacity: 0,
    currency: "Rp",
    icon: <Medal className="h-5 w-5" style={{ color: '#3B82F6' }} />,
    iconType: 'icon',
    iconColor: '#3B82F6',
    benefits: []
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 0,
    capacity: 0,
    onlineCapacity: 0,
    currency: "Rp",
    icon: <Crown className="h-5 w-5" style={{ color: '#F59E0B' }} />,
    iconType: 'icon',
    iconColor: '#F59E0B',
    benefits: []
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 0,
    capacity: 0,
    onlineCapacity: 0,
    currency: "Rp",
    icon: <Crown className="h-5 w-5" style={{ color: '#8B5CF6' }} />,
    iconType: 'icon',
    iconColor: '#8B5CF6',
    benefits: []
  }
];

export default function TicketPage() {
  const [isPaid, setIsPaid] = useState<boolean>(false);

  const [locationFormat] = useState<LocationFormat>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const format = params.get('format');
      if (format === 'online' || format === 'ofsite' || format === 'hybrid') {
        return format as LocationFormat;
      }
      window.location.href = '/dashboard/events/create';
      return 'ofsite';
    }
    return 'ofsite';
  });

  const [capacity, setCapacity] = useState<Capacity>({
    total: 0,
    onlineTotal: (locationFormat === 'online' || locationFormat === 'hybrid') ? 0 : undefined,
    grandTotal: 0,
    remaining: 0
  });
  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>([]);
  const [showIconLibrary, setShowIconLibrary] = useState<string | null>(null);

  // State untuk modal publish
  const [showPublishModal, setShowPublishModal] = useState(false);

  // Update calculated capacity ketika ticket tiers berubah (untuk paid events)
  useEffect(() => {
    if (isPaid) {
      const totalOffline = ticketTiers.reduce((sum, tier) => sum + tier.capacity, 0);
      const totalOnline = (locationFormat === 'online' || locationFormat === 'hybrid')
          ? ticketTiers.reduce((sum, tier) => sum + (tier.onlineCapacity || 0), 0)
          : 0;
      const grandTotal = totalOffline + totalOnline;

      setCapacity(prev => ({
        ...prev,
        total: totalOffline,
        onlineTotal: (locationFormat === 'online' || locationFormat === 'hybrid') ? totalOnline : undefined,
        grandTotal,
        remaining: 0
      }));
    }
  }, [ticketTiers, isPaid, locationFormat]);

  // Fungsi validasi form: jika ada input kosong, maka publish tidak boleh aktif
  const isFormValid = () => {
    if (!isPaid) {
      // Untuk free events, misalnya, kita asumsikan kapasitas harus lebih dari 0
      if (locationFormat === 'ofsite' && capacity.total <= 0) return false;
      if (locationFormat === 'online' && (!capacity.onlineTotal || capacity.onlineTotal <= 0)) return false;
      if (locationFormat === 'hybrid' && (capacity.total <= 0 || !capacity.onlineTotal || capacity.onlineTotal <= 0)) return false;
      return !capacity.error;
    } else {
      // Untuk paid events, pastikan ada minimal satu ticket tier dan tiap tier memiliki data yang valid
      if (ticketTiers.length === 0) return false;
      for (const tier of ticketTiers) {
        if (!tier.name.trim() || tier.price <= 0) return false;
        if ((locationFormat === 'ofsite' || locationFormat === 'hybrid') && tier.capacity <= 0) return false;
        if ((locationFormat === 'online' || locationFormat === 'hybrid') && (tier.onlineCapacity === undefined || tier.onlineCapacity <= 0)) return false;
      }
      return true;
    }
  };

  const generateTicketId = () => `ticket-${Date.now()}-${Math.random().toString(36).substring(2,9)}`;

  const addTicketTier = () => {
    const newTier: TicketTier = {
      id: generateTicketId(),
      name: '',
      price: 0,
      capacity: 0,
      onlineCapacity: locationFormat === 'hybrid' ? 0 : undefined,
      currency: "Rp", // set default currency
      icon: <Ticket className="h-5 w-5" />,
      iconType: 'icon',
      iconColor: '#4B5563',
      benefits: []
    };
    setTicketTiers([...ticketTiers, newTier]);
  };

  const validateCapacity = (tiers: TicketTier[]) => {
    if (isPaid) return true;

    if (locationFormat === 'online') return true;

    const totalOffline = tiers.reduce((sum, tier) => sum + tier.capacity, 0);
    let hasError = false;
    let errorMessage = '';

    if (locationFormat === 'hybrid') {
      const totalOnline = tiers.reduce((sum, tier) => sum + (tier.onlineCapacity || 0), 0);
      if (totalOffline > capacity.total) {
        errorMessage = "Offline capacity melebihi kapasitas yang tersedia";
        hasError = true;
      }
      if ((capacity.onlineTotal ?? 0) < totalOnline) {
        errorMessage = errorMessage
            ? `${errorMessage} dan online capacity melebihi batas`
            : "Online capacity melebihi kapasitas yang tersedia";
        hasError = true;
      }
    } else if (locationFormat === 'ofsite') {
      if (totalOffline > capacity.total) {
        errorMessage = "Capacity melebihi kapasitas yang tersedia";
        hasError = true;
      }
    }

    setCapacity(prev => ({
      ...prev,
      error: hasError ? errorMessage : undefined
    }));

    return !hasError;
  };

  const handleBenefitKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, tierId: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const value = target.value.trim();

      if (value) {
        setTicketTiers(prevTiers =>
            prevTiers.map(tier => {
              if (tier.id === tierId) {
                return {
                  ...tier,
                  benefits: [...tier.benefits, value]
                };
              }
              return tier;
            })
        );
        target.value = '';
      }
    }
  };

  const removeBenefit = (tierId: string, benefitIndex: number) => {
    setTicketTiers(prevTiers =>
        prevTiers.map(tier => {
          if (tier.id === tierId) {
            const newBenefits = [...tier.benefits];
            newBenefits.splice(benefitIndex, 1);
            return { ...tier, benefits: newBenefits };
          }
          return tier;
        })
    );
  };

  const handleIconUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const iconUrl = e.target?.result as string;
        updateTicketTier(id, 'iconUrl', iconUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateTicketTier = (id: string, field: keyof TicketTier, value: TicketTierUpdateValue) => {
    setTicketTiers(prevTiers => {
      const updatedTiers = prevTiers.map(tier => {
        if (tier.id !== id) return tier;

        let updatedTier: TicketTier = { ...tier };

        if (field === 'iconType') {
          const iconTypeValue = value as IconType;
          if (iconTypeValue === 'image') {
            updatedTier = {
              ...tier,
              iconType: iconTypeValue,
              icon: <ImageIcon className="h-5 w-5" />,
              iconUrl: ''
            };
          } else if (iconTypeValue === 'library') {
            updatedTier = {
              ...tier,
              iconType: iconTypeValue,
              icon: <Ticket className="h-5 w-5" style={{ color: tier.iconColor }} />
            };
          }
        } else if (field === 'iconColor') {
          const colorValue = value as string;
          if (tier.iconType === 'library' && tier.iconName) {
            const IconComponent = icons[tier.iconName as keyof typeof icons] as LucideIcon;
            updatedTier = {
              ...tier,
              iconColor: colorValue,
              icon: <IconComponent className="h-5 w-5" style={{ color: colorValue }} />
            };
          } else {
            updatedTier = {
              ...tier,
              iconColor: colorValue
            };
          }
        } else if (field === 'capacity') {
          const newCapacity = Number(value);

          if (!isPaid) {
            const otherCap = prevTiers
                .filter(t => t.id !== id)
                .reduce((sum, t) => sum + t.capacity, 0);

            updatedTier = {
              ...tier,
              capacity: newCapacity,
              error: otherCap + newCapacity > capacity.total
                  ? "Offline capacity melebihi kapasitas yang tersedia"
                  : undefined
            };
          } else {
            updatedTier = {
              ...tier,
              capacity: newCapacity
            };
          }
        } else if (field === 'onlineCapacity') {
          const newOnline = Number(value);

          if (!isPaid) {
            const otherOnline = prevTiers
                .filter(t => t.id !== id)
                .reduce((sum, t) => sum + (t.onlineCapacity || 0), 0);

            updatedTier = {
              ...tier,
              onlineCapacity: newOnline,
              error: otherOnline + newOnline > (capacity.onlineTotal ?? 0)
                  ? "Online capacity melebihi kapasitas yang tersedia"
                  : undefined
            };
          } else {
            updatedTier = {
              ...tier,
              onlineCapacity: newOnline
            };
          }
        } else if (field === 'currency') {
          updatedTier = {
            ...tier,
            currency: value as string
          };
        } else {
          updatedTier = {
            ...tier,
            [field]: value
          };
        }

        return updatedTier;
      });

      if (!isPaid) {
        validateCapacity(updatedTiers);
      }

      return updatedTiers;
    });
  };

  const selectLibraryIcon = (tierId: string, iconName: string) => {
    const IconComponent = icons[iconName as keyof typeof icons] as LucideIcon;
    setTicketTiers(prevTiers =>
        prevTiers.map(tier => {
          if (tier.id === tierId) {
            return {
              ...tier,
              icon: <IconComponent className="h-5 w-5" style={{ color: tier.iconColor }} />,
              iconName
            };
          }
          return tier;
        })
    );
    setShowIconLibrary(null);
  };

  const removeTicketTier = (id: string) => {
    const updatedTiers = ticketTiers.filter(tier => tier.id !== id);
    if (!isPaid) {
      validateCapacity(updatedTiers);
    }
    setTicketTiers(updatedTiers);
  };

  return (
      <div className="p-5 select-none">
        <Breadcrumb />
        <div className="flex flex-col my-5 gap-12 mb-36">
          <div className="mb-6">
            <label className="block text-lg font-medium text-dark">Event Type</label>
            <div className="flex gap-4 mt-2">
              <button
                  onClick={() => setIsPaid(false)}
                  className={`px-4 py-2 rounded-lg ${!isPaid ? 'bg-primary-mid text-white' : 'bg-gray-100 text-dark'}`}
              >
                Free
              </button>
              <button
                  onClick={() => setIsPaid(true)}
                  className={`px-4 py-2 rounded-lg ${isPaid ? 'bg-primary-mid text-white' : 'bg-gray-100 text-dark'}`}
              >
                Paid
              </button>
            </div>
          </div>

          {!isPaid && ((locationFormat === 'ofsite') || (locationFormat === 'hybrid') || (locationFormat === 'online')) && (
              <>
                {locationFormat === 'hybrid' ? (
                    <>
                      <div className="mt-6 space-y-4">
                        <div>
                          <label htmlFor="offline-capacity" className="block text-lg font-medium text-dark">
                            Offline Capacity
                          </label>
                          <input
                              type="number"
                              id="offline-capacity"
                              min="0"
                              value={capacity.total}
                              onChange={(e) => {
                                const newCap = parseInt(e.target.value);
                                setCapacity(prev => ({
                                  ...prev,
                                  total: newCap,
                                  remaining: newCap
                                }));
                              }}
                              placeholder="Enter offline capacity"
                              className="mt-2 block w-full p-4 text-dark border border-mid-dark rounded-lg bg-light focus:ring-primary-mid focus:border-primary-mid"
                          />
                        </div>
                      </div>
                      <div className="mt-6 space-y-4">
                        <div>
                          <label htmlFor="online-capacity" className="block text-lg font-medium text-dark">
                            Online Capacity
                          </label>
                          <input
                              type="number"
                              id="online-capacity"
                              min="0"
                              value={capacity.onlineTotal || 0}
                              onChange={(e) => {
                                const newCap = parseInt(e.target.value);
                                setCapacity(prev => ({
                                  ...prev,
                                  onlineTotal: newCap
                                }));
                              }}
                              placeholder="Enter online capacity"
                              className="mt-2 block w-full p-4 text-dark border border-mid-dark rounded-lg bg-light focus:ring-primary-mid focus:border-primary-mid"
                          />
                        </div>
                      </div>
                    </>
                ) : locationFormat === 'ofsite' ? (
                    <div className="mt-6 space-y-4">
                      <div>
                        <label htmlFor="capacity" className="block text-lg font-medium text-dark">
                          Capacity
                        </label>
                        <input
                            type="number"
                            id="capacity"
                            min="0"
                            value={capacity.total}
                            onChange={(e) => {
                              const newCap = parseInt(e.target.value);
                              setCapacity(prev => ({
                                ...prev,
                                total: newCap,
                                remaining: newCap
                              }));
                            }}
                            placeholder="Enter capacity"
                            className="mt-2 block w-full p-4 text-dark border border-mid-dark rounded-lg bg-light focus:ring-primary-mid focus:border-primary-mid"
                        />
                      </div>
                    </div>
                ) : (
                    <div className="mt-6 space-y-4">
                      <div>
                        <label htmlFor="online-only-capacity" className="block text-lg font-medium text-dark">
                          Online Capacity
                        </label>
                        <input
                            type="number"
                            id="online-only-capacity"
                            min="0"
                            value={capacity.onlineTotal || 0}
                            onChange={(e) => {
                              const newCap = parseInt(e.target.value);
                              setCapacity(prev => ({
                                ...prev,
                                onlineTotal: newCap
                              }));
                            }}
                            placeholder="Enter online capacity"
                            className="mt-2 block w-full p-4 text-dark border border-mid-dark rounded-lg bg-light focus:ring-primary-mid focus:border-primary-mid"
                        />
                      </div>
                    </div>
                )}
              </>
          )}

          {isPaid && ticketTiers.length > 0 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-dark mb-2">Capacity Summary</h3>
                <div>
                  <span className="font-medium">Grand Total Capacity:</span> {capacity.grandTotal}
                </div>
              </div>
          )}

          {isPaid && (
              <>
                <div className="mt-6">
                  <div className="flex justify-between items-center">
                    <label className="block text-lg font-medium text-dark">
                      Ticket Tiers
                    </label>
                    <button
                        onClick={() => setTicketTiers(defaultTiers)}
                        className="flex items-center gap-2 text-primary-mid hover:text-primary-dark"
                    >
                      <Plus size={20} />
                      Use Default Tiers
                    </button>
                  </div>

                  {ticketTiers.map((tier) => (
                      <div key={tier.id} className="mt-4 p-4 border border-mid-dark rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-center gap-2">
                            {tier.icon}
                            <select
                                value={tier.iconType}
                                onChange={(e) => updateTicketTier(tier.id, 'iconType', e.target.value as IconType)}
                                className="text-sm border border-mid-dark rounded px-2 py-1"
                            >
                              <option value="icon">Default Icon</option>
                              <option value="library">Icon Library</option>
                            </select>
                            <input
                                type="text"
                                value={tier.iconColor}
                                onChange={(e) => updateTicketTier(tier.id, 'iconColor', e.target.value)}
                                placeholder="Enter color code or gradient"
                                className="text-sm border border-mid-dark rounded px-2 py-1"
                            />
                            {tier.iconType === 'library' && (
                                <button
                                    onClick={() => setShowIconLibrary(tier.id)}
                                    className="text-sm text-primary-mid hover:text-primary-dark"
                                >
                                  Choose Icon
                                </button>
                            )}
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-dark mb-1">
                              Tier Name
                            </label>
                            <input
                                type="text"
                                value={tier.name}
                                onChange={(e) => updateTicketTier(tier.id, 'name', e.target.value)}
                                placeholder="Enter tier name"
                                className="w-full p-2 border border-mid-dark rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-dark mb-1">
                              Price
                            </label>
                            <div className="flex">
                              <select
                                  value={tier.currency || 'Rp'}
                                  onChange={(e) => updateTicketTier(tier.id, 'currency', e.target.value)}
                                  className="p-2 border border-mid-dark rounded-l-lg"
                              >
                                <option value="Rp">Rp</option>
                                <option value="$">$</option>
                                <option value="€">€</option>
                                <option value="£">£</option>
                              </select>
                              <input
                                  type="number"
                                  value={tier.price}
                                  onChange={(e) => updateTicketTier(tier.id, 'price', parseInt(e.target.value))}
                                  placeholder="Enter price"
                                  className="w-32 p-2 border border-mid-dark rounded-r-lg"
                              />
                            </div>
                          </div>
                          {(locationFormat === 'ofsite' || locationFormat === 'hybrid') && (
                              <div>
                                <label className="block text-sm font-medium text-dark mb-1">
                                  Offline Capacity
                                </label>
                                <input
                                    type="number"
                                    value={tier.capacity}
                                    onChange={(e) => updateTicketTier(tier.id, 'capacity', parseInt(e.target.value))}
                                    placeholder="Enter capacity"
                                    className={`w-32 p-2 border rounded-lg ${tier.error ? 'border-red-500' : 'border-mid-dark'}`}
                                />
                              </div>
                          )}
                          {(locationFormat === 'online' || locationFormat === 'hybrid') && (
                              <div>
                                <label className="block text-sm font-medium text-dark mb-1">
                                  Online Capacity
                                </label>
                                <input
                                    type="number"
                                    value={tier.onlineCapacity || 0}
                                    onChange={(e) => updateTicketTier(tier.id, 'onlineCapacity', parseInt(e.target.value))}
                                    placeholder="Enter online capacity"
                                    className={`w-32 p-2 border rounded-lg ${tier.error ? 'border-red-500' : 'border-mid-dark'}`}
                                />
                              </div>
                          )}
                          <button
                              onClick={() => removeTicketTier(tier.id)}
                              className="p-2 text-red-600 hover:text-red-800 self-end"
                          >
                            <Trash size={20} />
                          </button>
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-dark mb-1">
                            Benefits
                          </label>
                          <textarea
                              placeholder="Press Enter to add a benefit"
                              onKeyDown={(e) => handleBenefitKeyDown(e, tier.id)}
                              className="w-full p-2 border border-mid-dark rounded-lg mb-2"
                              rows={1}
                          />
                          <ul className="list-disc pl-5 space-y-1">
                            {tier.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <span>{benefit}</span>
                                  <button
                                      onClick={() => removeBenefit(tier.id, index)}
                                      className="text-red-500 hover:text-red-700"
                                  >
                                    <X size={14} />
                                  </button>
                                </li>
                            ))}
                          </ul>
                        </div>

                        {showIconLibrary === tier.id && (
                            <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
                              <div className="bg-white p-4 rounded-lg w-96 max-h-96 overflow-y-auto">
                                <div className="flex justify-between items-center mb-4">
                                  <h3 className="text-lg font-medium">Choose Icon</h3>
                                  <button
                                      onClick={() => setShowIconLibrary(null)}
                                      className="text-gray-500 hover:text-gray-700"
                                  >
                                    <X size={20} />
                                  </button>
                                </div>
                                <div className="grid grid-cols-6 gap-2">
                                  {iconList.map(({ name, component: Icon }) => (
                                      <button
                                          key={name}
                                          onClick={() => selectLibraryIcon(tier.id, name)}
                                          className="p-2 hover:bg-gray-100 rounded-lg flex items-center justify-center"
                                          title={name}
                                      >
                                        <Icon size={20} style={{ color: tier.iconColor }} />
                                      </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                        )}
                      </div>
                  ))}

                  <button
                      onClick={addTicketTier}
                      className="mt-4 flex items-center gap-2 py-2 px-4 border-2 border-primary-mid text-primary-mid hover:bg-primary-mid hover:text-white rounded-lg"
                  >
                    <Plus size={20} />
                    Add Custom Tier
                  </button>
                </div>
              </>
          )}

          <div className="mt-8 flex justify-end gap-4">
            <button className="py-2 px-6 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Save as Draft
            </button>
            <button
                onClick={() => setShowPublishModal(true)}
                className={`py-2 px-6 rounded-lg ${!isFormValid() ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-mid hover:bg-primary-dark'} text-white`}
                disabled={!isFormValid()}
            >
              Publish Event
            </button>
          </div>
        </div>

        {showPublishModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
              <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
                <h3 className="text-xl font-semibold mb-4">Confirmation</h3>
                <p className="mb-6">Do you want to publish Ticket Event?</p>
                <div className="flex justify-end gap-4">
                  <button
                      onClick={() => {
                        // Add publish action logic here
                        setShowPublishModal(false);
                      }}
                      className="bg-primary-mid text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                  >
                    Yes
                  </button>
                  <button
                      onClick={() => setShowPublishModal(false)}
                      className="bg-gray-300 text-dark px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}