 NeuroAI Suite: MultiModal Medical Imaging & Real-Time Drowsiness Detection System

LIVE-LINK: https://neuroaiii.netlify.app/

 Project Overview

NeuroAI Suite is a production-ready full-stack application integrating three specialized deep learning models for real-time medical diagnosis and driver safety. The project demonstrates expertise in end-to-end machine learning pipeline development, from model training through cloud deployment, with emphasis on medical imaging analysis and embedded threat detection.

 Technical Architecture

 AI Models & Architectures

1. Brain Tumor Detection (PyTorch)
 Architecture: Ensemble model combining ResNet50, DenseNet121, and VGG16 with custom fusion layers
 Technology: PyTorch with custom CBAM attention blocks
 Performance: Multiclass classification on MRI imagery with intermediate feature aggregation
 Preprocessing Pipeline: Grayscale normalization, CLAHE histogram equalization, gamma correction, and adaptive normalization to [1, 1] range for optimal network input

2. Pneumonia Detection (TensorFlow/Keras) 
 Architecture: Dual-Branch MobileNet with Squeeze-and-Excitation (SE) modules and Global Average Pooling
 Technology: TensorFlow Keras with custom attention mechanisms
 Optimization: Mobile-efficient architecture enabling real-time inference
 Preprocessing: Bilateral filtering, CLAHE enhancement, anatomical lung masking, and normalization

3. Drowsiness Detection (TensorFlow + Computer Vision)
 Architecture: MobileNetV2 with fallback to MediaPipe landmark-based classification
 DualMode Detection: 
 Neural network-based: Real-time eye state classification
 Landmark-based fallback: EyeAspectRatio (EAR) and MouthAspectRatio (MAR) metrics for edge deployment
 Robustness: Handles model serialization failures gracefully with deterministic fallback

 FullStack Implementation

Backend: FastAPI with containerized deployment
 RESTful API with dedicated endpoints for each diagnostic model
 In-memory image processing (no disk writes for privacy compliance)
 Comprehensive validation and error handling with structured logging
 CORS middleware for secure cross-origin requests
 Threadsafe concurrent inference

Frontend: React + Vite + TypeScript
 Real-time image upload with live camera feed processing
 Individual model prediction interfaces with confidence scores
 Session-based analytics tracking
 Responsive UI with accessibility compliance

Deployment: Production-ready infrastructure
 Docker containerization for Hugging Face Spaces backend
 Netlify CI/CD for frontend static hosting
 Optional private model repository architecture for IP protection
 Environment-driven configuration for multienvironment support

 Key Technical Achievements

 Advanced Preprocessing: Implemented domain-specific image enhancement techniques (CLAHE, bilateral filtering, anatomical masking) that directly improved model robustness across diverse input quality

 Ensemble Learning: Designed and integrated a three-backbone ensemble architecture with learnable feature fusion, demonstrating understanding of model aggregation and decision boundary optimization

 Graceful Degradation: Implemented fallback mechanisms (MediaPipe landmarks → heuristic classification), ensuring deployment resilience when primary models are unavailable

 PrivacyFirst Architecture: Designed in-memory processing pipeline protecting user data while maintaining diagnostic accuracy

 Production Deployment: End-to-end containerization and cloud deployment on freetier services (HF Spaces, Netlify), demonstrating cost-effective scalability

 Impact & Applications

 Medical Domain: Assists radiologists with automated preliminary screening for brain tumors and pneumonia from medical imaging
 Safety: Real-time driver drowsiness detection system for accident prevention in vehicle environments
 Accessibility: Browser-based interface enables nontechnical medical professionals to run diagnostics without specialized infrastructure

 Technologies & Skills Demonstrated

Machine Learning: Deep learning architectures, ensemble methods, transfer learning, feature engineering, preprocessing pipelines

Backend Development: FastAPI, RESTful API design, containerization (Docker), error handling, concurrent request processing

Frontend Development: React, TypeScript, real-time media processing, responsive UI design

DevOps & Deployment: Docker, cloud platforms (HuggingFace Spaces, Netlify), environment management, CI/CD integration

Computer Vision: Image preprocessing, medical imaging analysis, real-time video processing, MediaPipe integration




Current Version: 1.0.0 Production Release | Active Development: Enhanced model visualization and inference optimization

