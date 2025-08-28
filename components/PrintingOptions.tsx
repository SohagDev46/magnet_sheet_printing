import React from 'react';
import { ProductOptions } from '../types';
import { SIZES, QUANTITIES, MATERIALS, PRINTING_OPTIONS, LAMINATION_OPTIONS, SHAPES } from '../constants';

interface PrintingOptionsProps {
  options: ProductOptions;
  onOptionChange: <K extends keyof ProductOptions>(key: K, value: ProductOptions[K]) => void;
}

export const PrintingOptions: React.FC<PrintingOptionsProps> = ({ options, onOptionChange }) => {

  const handleQuantitySelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    onOptionChange('quantitySelection', value);
    if (value !== 'Custom') {
      onOptionChange('quantity', parseInt(value, 10));
    }
  };

  const OptionWrapper: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-300">{title}</label>
      {children}
    </div>
  );

  const SelectInput: React.FC<{ value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode }> = ({ value, onChange, children }) => (
    <select
      value={value}
      onChange={onChange}
      className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
    >
      {children}
    </select>
  );

  const RadioGroup: React.FC<{ name: string; selectedValue: string; options: {value: string; label: string; description?: string}[]; onChange: (value: string) => void }> = ({ name, selectedValue, options: radioOptions, onChange }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {radioOptions.map(opt => (
            <label key={opt.value} className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${selectedValue === opt.value ? 'bg-indigo-600 border-indigo-500' : 'bg-gray-800 border-gray-600 hover:border-gray-500'}`}>
                <input type="radio" name={name} value={opt.value} checked={selectedValue === opt.value} onChange={() => onChange(opt.value)} className="hidden" />
                <span className="font-semibold text-white block">{opt.label}</span>
                {opt.description && <span className="text-xs text-gray-300">{opt.description}</span>}
            </label>
        ))}
    </div>
  );


  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Customize Your Order</h2>
      <div className="flex flex-col gap-y-6">
        <OptionWrapper title="Individual Artwork Size">
          <SelectInput value={options.size} onChange={(e) => onOptionChange('size', e.target.value)}>
            {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
          </SelectInput>
           <p className="text-xs text-gray-400 mt-1">
            Specify the size of your individual stickers. Pricing is based on the quantity of A3 sheets, not this size.
          </p>
        </OptionWrapper>

        {options.size === 'Custom' && (
          <div className="grid grid-cols-3 gap-3 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <input 
                type="number"
                placeholder="Width"
                value={options.customWidth}
                onChange={(e) => onOptionChange('customWidth', e.target.value)}
                className="col-span-1 bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
               <input 
                type="number"
                placeholder="Height"
                value={options.customHeight}
                onChange={(e) => onOptionChange('customHeight', e.target.value)}
                className="col-span-1 bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <SelectInput value={options.unit} onChange={(e) => onOptionChange('unit', e.target.value as ProductOptions['unit'])}>
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="in">in</option>
              </SelectInput>
          </div>
        )}

        <OptionWrapper title="Quantity (A3 Sheets)">
          <SelectInput value={options.quantitySelection} onChange={handleQuantitySelectionChange}>
            {QUANTITIES.map(q => <option key={q} value={String(q)}>{q}</option>)}
          </SelectInput>
        </OptionWrapper>

        {options.quantitySelection === 'Custom' && (
           <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg -mt-3">
              <label className="text-xs text-gray-400 mb-1 block">Custom Quantity</label>
              <input 
                type="number"
                placeholder="Enter quantity"
                value={options.quantity}
                min="1"
                onChange={(e) => onOptionChange('quantity', Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-full bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
          </div>
        )}

        <OptionWrapper title="Material Type">
          <SelectInput value={options.material} onChange={(e) => onOptionChange('material', e.target.value)}>
            {MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}
          </SelectInput>
        </OptionWrapper>

        <OptionWrapper title="Printing">
          <SelectInput value={options.printing} onChange={(e) => onOptionChange('printing', e.target.value)}>
            {PRINTING_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
          </SelectInput>
        </OptionWrapper>
        
        <OptionWrapper title="Lamination">
          <SelectInput value={options.lamination} onChange={(e) => onOptionChange('lamination', e.target.value)}>
            {LAMINATION_OPTIONS.map(l => <option key={l} value={l}>{l}</option>)}
          </SelectInput>
        </OptionWrapper>
        
        <OptionWrapper title="Magnet Shape">
          <SelectInput value={options.shape} onChange={(e) => onOptionChange('shape', e.target.value)}>
            {SHAPES.map(s => <option key={s} value={s}>{s}</option>)}
          </SelectInput>
        </OptionWrapper>

        <OptionWrapper title="Cutting Service">
            <RadioGroup
                name="cutting"
                selectedValue={options.cutting}
                onChange={(value) => onOptionChange('cutting', value as ProductOptions['cutting'])}
                options={[
                    {value: 'by_us', label: 'By Us', description: '+RM 5.00'},
                    {value: 'individual', label: 'Individually', description: 'DIY Cutting'},
                ]}
            />
        </OptionWrapper>
        
        <OptionWrapper title="Shipping Method">
            <RadioGroup
                name="shipping"
                selectedValue={options.shipping}
                onChange={(value) => onOptionChange('shipping', value as ProductOptions['shipping'])}
                options={[
                    {value: 'courier', label: 'Courier', description: '+RM 10.00'},
                    {value: 'pickup', label: 'Self Pickup', description: 'Free'},
                    {value: 'ride', label: 'Ride Hailing', description: 'Arrange own'},
                ]}
            />
        </OptionWrapper>
      </div>
    </div>
  );
};