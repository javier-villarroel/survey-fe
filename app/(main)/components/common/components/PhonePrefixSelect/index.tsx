import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';

export const PHONE_PREFIXES = [
    { label: '0416', value: '0416' },
    { label: '0426', value: '0426' },
    { label: '0414', value: '0414' },
    { label: '0424', value: '0424' },
    { label: '0412', value: '0412' }
];

interface PhonePrefixSelectProps {
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
    disabled?: boolean;
}

export const PhonePrefixSelect = ({ value, onChange, error, disabled }: PhonePrefixSelectProps) => {
    return (
        <Dropdown
            value={value}
            onChange={(e) => onChange(e.value)}
            options={PHONE_PREFIXES}
            placeholder="Prefijo"
            className={classNames("w-full", {
                "p-invalid": error
            })}
            disabled={disabled}
        />
    );
}; 