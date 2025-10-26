'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function CropRecommendationPage() {
  const [formData, setFormData] = useState({
    nitrogen: '90',
    phosphorus: '42',
    potassium: '43',
    temperature: '20.8',
    humidity: '82',
    ph: '6.5',
    rainfall: '202.9',
  });
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setRecommendation('Fetching recommendation...');

    try {
      const apiResponse = await fetch('/api/crop-recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          N: parseFloat(formData.nitrogen),
          P: parseFloat(formData.phosphorus),
          K: parseFloat(formData.potassium),
          temperature: parseFloat(formData.temperature),
          humidity: parseFloat(formData.humidity),
          ph: parseFloat(formData.ph),
          rainfall: parseFloat(formData.rainfall),
        }),
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(errorData.error || 'Failed to get crop recommendation');
      }

      const data = await apiResponse.json();
// The API returns a string like "**Banana** is the recommended crop".
// We extract the bolded part.
const match = data.recommendation.match(/\*\*(.*?)\*\*/);
const cropName = match ? match[1] : data.recommendation;
setRecommendation(cropName);
} catch (error: any) {
  console.error('Error during crop recommendation:', error);
  setRecommendation(`Error: ${error.message}`);
} finally {
  setIsLoading(false);
}
};

const parameterRanges = {
  nitrogen: '0-140',
  phosphorus: '5-145',
  potassium: '5-205',
  temperature: '8-43°C',
  humidity: '14-100%',
  ph: '3.5-9.9',
  rainfall: '20-300mm',
};

return (
  <div className="min-h-screen flex flex-col items-center justify-center p-4">
    <h1 className="text-4xl font-bold mb-8">Crop Recommendation</h1>
    <div className="w-full max-w-lg space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nitrogen" className="block text-sm font-medium text-foreground">
            Nitrogen (N) <span className="text-muted-foreground text-xs">({parameterRanges.nitrogen})</span>
          </label>
          <Input
            type="number"
            id="nitrogen"
            name="nitrogen"
            value={formData.nitrogen}
            onChange={handleChange}
            placeholder="e.g., 50"
            required
          />
        </div>

        <div>
          <label htmlFor="phosphorus" className="block text-sm font-medium text-foreground">
            Phosphorus (P) <span className="text-muted-foreground text-xs">({parameterRanges.phosphorus})</span>
          </label>
          <Input
            type="number"
            id="phosphorus"
            name="phosphorus"
            value={formData.phosphorus}
            onChange={handleChange}
            placeholder="e.g., 70"
            required
          />
        </div>

        <div>
          <label htmlFor="potassium" className="block text-sm font-medium text-foreground">
            Potassium (K) <span className="text-muted-foreground text-xs">({parameterRanges.potassium})</span>
          </label>
          <Input
            type="number"
            id="potassium"
            name="potassium"
            value={formData.potassium}
            onChange={handleChange}
            placeholder="e.g., 100"
            required
          />
        </div>

        <div>
          <label htmlFor="temperature" className="block text-sm font-medium text-foreground">
            Temperature (°C) <span className="text-muted-foreground text-xs">({parameterRanges.temperature})</span>
          </label>
          <Input
            type="number"
            id="temperature"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            placeholder="e.g., 25"
            step="0.1"
            required
          />
        </div>

        <div>
          <label htmlFor="humidity" className="block text-sm font-medium text-foreground">
            Humidity (%) <span className="text-muted-foreground text-xs">({parameterRanges.humidity})</span>
          </label>
          <Input
            type="number"
            id="humidity"
            name="humidity"
            value={formData.humidity}
            onChange={handleChange}
            placeholder="e.g., 60"
            step="0.1"
            required
          />
        </div>

        <div>
          <label htmlFor="ph" className="block text-sm font-medium text-foreground">
            pH Level <span className="text-muted-foreground text-xs">({parameterRanges.ph})</span>
          </label>
          <Input
            type="number"
            id="ph"
            name="ph"
            value={formData.ph}
            onChange={handleChange}
            placeholder="e.g., 6.5"
            step="0.1"
            required
          />
        </div>

        <div>
          <label htmlFor="rainfall" className="block text-sm font-medium text-foreground">
            Rainfall (mm) <span className="text-muted-foreground text-xs">({parameterRanges.rainfall})</span>
          </label>
          <Input
            type="number"
            id="rainfall"
            name="rainfall"
            value={formData.rainfall}
            onChange={handleChange}
            placeholder="e.g., 150"
            step="0.1"
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Getting Recommendation...' : 'Get Crop Recommendation'}
        </Button>
      </form>

      {recommendation && (
        <div className="mt-6 p-4 border rounded-lg bg-secondary text-secondary-foreground text-center">
          <h4 className="font-medium text-lg">Recommended Crop:</h4>
          <p className="text-3xl font-bold mt-2">{recommendation}</p>
        </div>
      )}
    </div>
  </div>
);
}
