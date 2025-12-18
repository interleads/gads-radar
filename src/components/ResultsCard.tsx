import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { AlertTriangle, Users, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface KeywordData {
  keyword: string;
  searchVolume: number;
  competition: 'Baixa' | 'Média' | 'Alta';
  cpc: number;
}

interface ResultsCardProps {
  location: string;
  niche: string;
  keywordsData: KeywordData[];
  primaryKeywordVolume: number;
  totalVolume: number;
  keywordCount: number;
  annualVolume?: number;
}

const competitionColor = {
  'Baixa': 'bg-green-500 text-white',
  'Média': 'bg-yellow-500 text-white',
  'Alta': 'bg-red-500 text-white'
};

const ResultsCard: React.FC<ResultsCardProps> = ({
  location,
  niche,
  keywordsData,
  primaryKeywordVolume = 0,
  totalVolume = 0,
  keywordCount = 0,
}) => {
  const displayTotalVolume = totalVolume || keywordsData.reduce((sum, k) => sum + k.searchVolume, 0);
  const displayKeywordCount = keywordCount || keywordsData.length;

  return (
    <div className="animate-fade-in">
      {/* Hero Alert Section - Urgência */}
      <div className="bg-gradient-to-r from-red-100 via-orange-100 to-amber-50 border-l-4 border-red-500 p-6 md:p-8 rounded-lg shadow-lg mb-6">
        {/* Main Headline */}
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 md:w-10 md:h-10 text-red-600 flex-shrink-0 mt-1" />
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
            Alerta: Sua empresa está invisível para{" "}
            <span className="text-red-600 text-3xl md:text-4xl lg:text-5xl font-black">
              {displayTotalVolume.toLocaleString()}
            </span>{" "}
            potenciais clientes este mês.
          </h1>
        </div>

        {/* Subheadline */}
        <p className="text-base md:text-lg text-gray-700 mb-6 ml-0 md:ml-11">
          Neste exato momento, milhares de pessoas estão pesquisando por{" "}
          <strong className="text-gray-900">"{niche}"</strong> no Google em{" "}
          <strong className="text-gray-900">{location}</strong>. 
          Seus concorrentes estão aparecendo para elas, <strong className="text-red-700">mas você não</strong>.
        </p>

        {/* Visual Data Highlight */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-red-200 ml-0 md:ml-11">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center border-2 border-white">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center border-2 border-white">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center border-2 border-white">
                <Search className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-600 font-medium">
              Volume Total de Buscas na sua Região
            </p>
            <p className="text-2xl md:text-3xl font-black text-red-600">
              {displayTotalVolume.toLocaleString()}<span className="text-lg font-bold text-gray-600">/mês</span>
            </p>
            <p className="text-xs text-gray-500">
              {displayKeywordCount} palavras-chave relacionadas a "{niche}"
            </p>
          </div>
        </div>
      </div>

      {/* Keywords Table Card */}
      <Card className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-lg">
        
        {/* Keywords section */}
        <div className="border-t border-gray-200"></div>
        
        <CardContent className="p-6 bg-white">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Top {keywordsData.length} palavras-chave
          </h3>
          
          <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-200">
                  <TableHead className="text-gray-700 font-medium text-lg py-4">Palavra-chave</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium text-lg py-4">Volume de busca</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium text-lg py-4">CPC médio (R$)</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium text-lg py-4">Concorrência</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywordsData.map((keyword, index) => (
                  <TableRow 
                    key={index} 
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} ${index === 0 ? "border-l-4 border-l-teal-500" : ""}`}
                  >
                    <TableCell className={`font-medium text-gray-700 ${index === 0 ? "font-bold" : ""}`}>
                      {keyword.keyword}
                      {index === 0 && <Badge className="ml-2 bg-teal-500 text-white">Principal</Badge>}
                    </TableCell>
                    <TableCell className="text-right text-gray-700 font-semibold">
                      {keyword.searchVolume.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-gray-700">
                      {keyword.cpc.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className={`px-3 py-1 ${competitionColor[keyword.competition]}`}>
                        {keyword.competition}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsCard;
