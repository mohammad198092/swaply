import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <Button asChild className="mb-8">
          <Link to="/">
            <ArrowRight className="ml-2" />
            Back to Home
          </Link>
        </Button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Terms of Use and Disclaimer</h1>
          
          <div className="space-y-4">
            <section>
              <h2 className="text-xl font-semibold mb-2">Terms of Use</h2>
              <p>By using this application, you agree to the following terms:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>All provided information must be accurate and truthful</li>
                <li>Posting any content that violates laws or public morals is prohibited</li>
                <li>You must respect others' intellectual property rights</li>
                <li>We reserve the right to remove any content that violates the terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Disclaimer</h2>
              <p>We are not responsible for:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Any transactions between users</li>
                <li>The accuracy or truthfulness of information provided by users</li>
                <li>Any losses or damages resulting from using the application</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;