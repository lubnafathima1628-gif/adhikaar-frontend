'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface DocumentRequirement {
  id: string;
  type: string;
  label: string;
  required: boolean;
  description: string;
  status: 'pending' | 'submitted' | 'verified';
}

interface RecoveryGuideProps {
  assetId: string;
  assetName: string;
  documents: DocumentRequirement[];
}

export function RecoveryGuide({
  assetId,
  assetName,
  documents,
}: RecoveryGuideProps) {
  const [uploadedFiles, setUploadedFiles] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState<'documents' | 'verification' | 'claim'>
    ('documents');

  const handleFileUpload = (docId: string, file: File) => {
    // In real app, upload to backend
    const newUploaded = new Set(uploadedFiles);
    newUploaded.add(docId);
    setUploadedFiles(newUploaded);
  };

  const allDocumentsSubmitted = documents
    .filter((d) => d.required)
    .every((d) => uploadedFiles.has(d.id));

  const progressPercentage = (uploadedFiles.size / documents.length) * 100;

  return (
    <div className="relative z-10 min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cream mb-2">
            Complete Your Recovery
          </h1>
          <p className="text-sage">
            Asset: <span className="text-cream font-semibold">{assetName}</span>
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            {[
              { id: 'documents', label: 'Documents' },
              { id: 'verification', label: 'Verification' },
              { id: 'claim', label: 'Claim' },
            ].map((step, index, arr) => (
              <div key={step.id} className="flex items-center flex-1">
                <motion.button
                  onClick={() => setCurrentStep(step.id as any)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    currentStep === step.id
                      ? 'bg-teal text-cream ring-2 ring-teal/50'
                      : 'bg-forest-light text-sage'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {index + 1}
                </motion.button>
                <p
                  className={`ml-3 text-sm font-medium ${
                    currentStep === step.id ? 'text-cream' : 'text-sage'
                  }`}
                >
                  {step.label}
                </p>
                {index < arr.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      uploadedFiles.size > 0
                        ? 'bg-teal'
                        : 'bg-charcoal-light'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-forest/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-teal to-teal-light"
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Documents Step */}
        {currentStep === 'documents' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-cream mb-6">
              Required Documents
            </h2>

            {documents.map((doc, index) => {
              const isUploaded = uploadedFiles.has(doc.id);

              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`transition-all ${
                      isUploaded ? 'border-sage bg-sage/5' : ''
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <FileText className="w-5 h-5 text-teal" />
                            <h3 className="text-lg font-semibold text-cream">
                              {doc.label}
                            </h3>
                            {!doc.required && (
                              <span className="text-xs text-sage-light ml-2">
                                (Optional)
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-sage">{doc.description}</p>
                        </div>
                        {isUploaded && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center space-x-2 text-sage"
                          >
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">Uploaded</span>
                          </motion.div>
                        )}
                      </div>

                      {!isUploaded && (
                        <label className="flex items-center justify-center p-4 border-2 border-dashed border-charcoal-light rounded-lg hover:border-teal cursor-pointer transition-colors">
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(doc.id, file);
                            }}
                          />
                          <div className="text-center">
                            <Upload className="w-5 h-5 text-teal mx-auto mb-2" />
                            <p className="text-sm text-cream">Click to upload</p>
                            <p className="text-xs text-sage-light">or drag and drop</p>
                          </div>
                        </label>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex space-x-4 mt-8"
            >
              <Button variant="outline" className="flex-1">
                Save & Continue Later
              </Button>
              <Button
                disabled={!allDocumentsSubmitted}
                onClick={() => setCurrentStep('verification')}
                className="flex-1 bg-teal hover:bg-teal-light text-cream"
              >
                Continue to Verification
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Verification Step */}
        {currentStep === 'verification' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-cream mb-6">
              Verification & KYC
            </h2>

            <Card className="bg-forest-dark/80 border-charcoal-light/50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-sage mb-2">
                      Full Name (as per ID proof)
                    </label>
                    <Input placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage mb-2">
                      Email
                    </label>
                    <Input type="email" placeholder="Enter email" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage mb-2">
                      Phone Number
                    </label>
                    <Input type="tel" placeholder="Enter phone number" />
                  </div>
                  <div className="bg-teal/10 border border-teal/30 rounded-lg p-4 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-cream">
                      Your information is secure and encrypted. We verify your identity before processing claims.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('documents')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={() => setCurrentStep('claim')}
                className="flex-1 bg-teal hover:bg-teal-light text-cream"
              >
                Proceed to Claim
              </Button>
            </div>
          </motion.div>
        )}

        {/* Claim Step */}
        {currentStep === 'claim' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-cream mb-6">Submit Claim</h2>

            <Card className="bg-gradient-to-br from-sage/20 to-teal/20 border-teal/30">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <CheckCircle className="w-12 h-12 text-sage mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-cream mb-2">
                    You're all set!
                  </h3>
                  <p className="text-sage">
                    All required documents have been submitted and verified.
                  </p>
                </div>

                <div className="space-y-3 bg-forest/30 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-sage">Asset</span>
                    <span className="text-cream font-medium">{assetName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage">Claim Status</span>
                    <span className="text-teal font-medium">Ready to Submit</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage">Estimated Time</span>
                    <span className="text-cream font-medium">5-10 Business Days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('verification')}
                className="flex-1"
              >
                Back
              </Button>
              <Button className="flex-1 bg-teal hover:bg-teal-light text-cream text-lg py-6">
                Submit Claim
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
